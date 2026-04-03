import { useState } from "react";
import { CreditCard } from "lucide-react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import Select from "../Select";
import { EyeCloseIcon, EyeIcon, TimeIcon } from "../../../icons";
import DatePicker from "../date-picker";
export default function DefaultInputs() {
    const [showPassword, setShowPassword] = useState(false);
    const options = [
        { value: "marketing", label: "Marketing" },
        { value: "template", label: "Template" },
        { value: "development", label: "Development" },
    ];
    const handleSelectChange = (value) => {
        console.log("Selected value:", value);
    };
    return (<ComponentCard title="Default Inputs">
      <div className="space-y-6">
        <div>
          <Label htmlFor="input">Input</Label>
          <Input type="text" id="input"/>
        </div>
        <div>
          <Label htmlFor="inputTwo">Input with Placeholder</Label>
          <Input type="text" id="inputTwo" placeholder="info@gmail.com"/>
        </div>
        <div>
          <Label>Select Input</Label>
          <Select options={options} placeholder="Select an option" onChange={handleSelectChange} className="dark:bg-dark-900"/>
        </div>
        <div>
          <Label>Password Input</Label>
          <div className="relative">
            <Input type={showPassword ? "text" : "password"} placeholder="Enter your password"/>
            <button onClick={() => setShowPassword(!showPassword)} className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2">
              {showPassword ? (<EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5"/>) : (<EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5"/>)}
            </button>
          </div>
        </div>

        <div>
          <DatePicker id="date-picker" label="Date Picker Input" placeholder="Select a date" onChange={(dates, currentDateString) => {
            // Handle your logic
            console.log({ dates, currentDateString });
        }}/>
        </div>

        <div>
          <Label htmlFor="tm">Time Picker Input</Label>
          <div className="relative">
            <Input type="time" id="tm" name="tm" onChange={(e) => console.log(e.target.value)}/>
            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
              <TimeIcon className="size-6"/>
            </span>
          </div>
        </div>
        <div>
          <Label htmlFor="tm">Input with Payment</Label>
          <div className="relative">
            <Input type="text" placeholder="Card number" className="pl-[62px]"/>
            <span className="absolute left-0 top-1/2 flex h-11 w-[46px] -translate-y-1/2 items-center justify-center border-r border-gray-200 dark:border-gray-800">
              <CreditCard width={20} height={20} className="text-gray-700 dark:text-gray-300" />
            </span>
          </div>
        </div>
      </div>
    </ComponentCard>);
}
