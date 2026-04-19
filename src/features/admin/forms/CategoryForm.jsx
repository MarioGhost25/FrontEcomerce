import { useState } from "react";
import { toast } from "sonner";
import Form from "../../../components/form/Form";
import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import TextArea from "../../../components/form/input/TextArea";
import ImageUpload from "../../../components/form/ImageUpload";
import Switch from "../../../components/form/switch/Switch";
import Button from "../../../components/ui/button/Button";
import { useForm } from "../../../hooks/useForm";
import { useCreateCategoryMutation } from "../../../api/endpoints/categoryApi";
import { useUploadProductImageMutation } from "../../../api/endpoints/productApi";
import { useNavigate } from "react-router";
import { z } from "zod";

const categorySchema = z.object({
  name: z.string().trim().min(1, "Category name is required"),
  slug: z.string().trim().min(1, "Slug is required"),
  description: z.string().trim().min(1, "Description is required"),
});

const CategoryForm = ({ category = null, onCancel }) => {

  const [createCategory] = useCreateCategoryMutation();
  const [uploadProductImage] = useUploadProductImageMutation();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const {
    name,
    description,
    image,
    slug,
    isActive,
    onInputChange,
    onResetForm,
  } = useForm({
    name: category?.name || "",
    description: category?.description || "",
    image: category?.image || '',
    isActive: category?.isActive ?? true,
    slug: category?.slug || "",
  });

  const handleImageChange = (updatedImage) => {
    const normalizedImage = Array.isArray(updatedImage)
      ? updatedImage[0] ?? null
      : updatedImage;

    onInputChange({ target: { name: "image", value: normalizedImage } });
  };

  const handleIsActiveChange = (value) => {
    onInputChange({ target: { name: "isActive", value } });
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    onInputChange({ target: { name: "name", value: newName } });
  };

  const handleGenerateSlug =(e) => {
    e.preventDefault();

    if (!name?.trim()) return toast.error("Please enter a category name to generate slug");
    
    const generatedSlug = name.split(/\s/gm).join("-").toLowerCase();
    onInputChange({ target: { name: "slug", value: generatedSlug } });

  }

  const uploadImageAndGetUrl = async (img) => {
    const normalizedImage = Array.isArray(img) ? img[0] : img;

    if (typeof normalizedImage === "string") {
      return normalizedImage.startsWith("blob:") ? null : normalizedImage;
    }

    const file = normalizedImage?.file ?? normalizedImage;

    if (!(file instanceof File)) {
      return null;
    }

    const formData = new FormData();
    formData.append("file", file);

    const uploadResponse = await uploadProductImage(formData).unwrap();
    const imageUrl = uploadResponse?.url;

    if (!imageUrl) {
      throw new Error('No se obtuvo URL de la imagen');
    }

    return imageUrl;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = categorySchema.safeParse({
      name,
      slug,
      description,
    });

    if (!validation.success) {
      const formErrors = validation.error.issues.reduce((acc, issue) => {
        const field = issue.path[0];
        if (typeof field === "string" && !acc[field]) {
          acc[field] = issue.message;
        }
        return acc;
      }, {});

      setErrors(formErrors);
      return;
    }

    setErrors({});

    try {
      const uploadImage = await uploadImageAndGetUrl(image);

      const payload = {
        name: validation.data.name,
        description: validation.data.description,
        image: uploadImage,
        isActive,
        slug: validation.data.slug,
      };

      await createCategory(payload).unwrap();
      toast.success(category ? "Category updated" : "Category created");
      onResetForm();
      navigate("/dashboard/category-management");
    } catch (error) {
      toast.error(error?.data?.message || error?.message || "Error saving category");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {category ? "Edit Category" : "Add New Category"}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {category ? "Update category information" : "Create a new category for your store"}
        </p>
      </div>

      <Form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Basic Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name">Category Name *</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={handleNameChange}
                placeholder="Enter category name"
                error={!!errors.name}
                hint={errors.name}
              />
            </div>

            <div>
              <Label htmlFor="slug">Slug *</Label>
              <Input
                type="text"
                id="slug"
                name="slug"
                value={slug}
                onChange={onInputChange}
                placeholder="category-slug"
                error={!!errors.slug}
                hint={errors.slug}
              />
              <Button
                text="Generate Slug"
                className="mt-2 px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                onClick={handleGenerateSlug}
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="description">Description *</Label>
              <TextArea
                id="description"
                name="description"
                value={description}
                onChange={onInputChange}
                rows={4}
                placeholder="Detailed category description"
                error={!!errors.description}
                hint={errors.description}
              />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Category Image
          </h3>

          <ImageUpload
            onImagesChange={handleImageChange}
            maxImages={1}
            singleImage={true}
            image={image}
          />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Category Settings
          </h3>

          <div className="space-y-4">
            <Switch
              label="Category is active"
              defaultChecked={isActive}
              onChange={handleIsActiveChange}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
          <Button
            type="button"
            text="Cancel"
            className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            onClick={onCancel}
          />
          <Button
            type="submit"
            text={category ? "Update Category" : "Create Category"}
            className="px-6 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors"
          />
        </div>
      </Form>
    </div>
  );
};

export default CategoryForm;
