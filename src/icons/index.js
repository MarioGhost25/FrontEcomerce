import * as LucideIcons from "lucide-react";

const pickIcon = (...names) => {
	for (const name of names) {
		if (LucideIcons[name]) return LucideIcons[name];
	}
	return LucideIcons.Circle;
};

const PlusIcon = pickIcon("Plus");
const CheckIcon = pickIcon("Check");
const CommentIcon = pickIcon("MessageSquare", "MessageCircle");
const PublicIcon = pickIcon("Globe");
const VerifiedIcon = pickIcon("BadgeCheck", "ShieldCheck");
const SupportAgentIcon = pickIcon("Headset", "CircleHelp");
const LocalShippingIcon = pickIcon("Truck");
const SearchIcon = pickIcon("Search");
const FavoriteIcon = pickIcon("Heart");
const ShoppingBagIcon = pickIcon("ShoppingBag");
const StoreIcon = pickIcon("Store", "Building2");
const ShoppingCartIcon = pickIcon("ShoppingCart");
const AddShoppingCartIcon = pickIcon("ShoppingCart");
const CloseIcon = pickIcon("X");
const BoxIcon = pickIcon("Package");
const CheckCircleIcon = pickIcon("CircleCheck");
const AlertIcon = pickIcon("TriangleAlert", "AlertTriangle");
const InfoIcon = pickIcon("Info");
const ErrorIcon = pickIcon("CircleAlert", "AlertCircle");
const BoltIcon = pickIcon("Zap");
const ArrowUpIcon = pickIcon("ArrowUp");
const ArrowDownIcon = pickIcon("ArrowDown");
const FolderIcon = pickIcon("Folder");
const VideoIcon = pickIcon("Video");
const AudioIcon = pickIcon("AudioLines", "Volume2");
const GridIcon = pickIcon("Grid3X3", "Grid2X2");
const FileIcon = pickIcon("File");
const DownloadIcon = pickIcon("Download");
const ArrowRightIcon = pickIcon("ArrowRight");
const GroupIcon = pickIcon("Users");
const BoxIconLine = pickIcon("PackageOpen", "Package");
const ShootingStarIcon = pickIcon("Sparkles", "Star");
const DollarLineIcon = pickIcon("DollarSign", "BadgeDollarSign");
const TrashBinIcon = pickIcon("Trash2", "Trash");
const AngleUpIcon = pickIcon("ChevronUp");
const KeyArrowDownIcon = pickIcon("ChevronDown", "ArrowDown");
const AngleDownIcon = pickIcon("ChevronDown");
const AngleLeftIcon = pickIcon("ChevronLeft");
const AngleRightIcon = pickIcon("ChevronRight");
const PencilIcon = pickIcon("Pencil");
const CheckLineIcon = pickIcon("Check");
const CloseLineIcon = pickIcon("X");
const ChevronDownIcon = pickIcon("ChevronDown");
const ChevronUpIcon = pickIcon("ChevronUp");
const ChevronRightIcon = pickIcon("ChevronRight");
const PaperPlaneIcon = pickIcon("Send");
const LockIcon = pickIcon("Lock");
const EnvelopeIcon = pickIcon("Mail");
const UserIcon = pickIcon("User");
const CalenderIcon = pickIcon("Calendar");
const EyeIcon = pickIcon("Eye");
const EyeCloseIcon = pickIcon("EyeOff");
const TimeIcon = pickIcon("Clock3", "Clock");
const CopyIcon = pickIcon("Copy");
const ChevronLeftIcon = pickIcon("ChevronLeft");
const UserCircleIcon = pickIcon("CircleUserRound", "CircleUser", "UserRound", "User");
const TaskIcon = pickIcon("ListTodo");
const ListIcon = pickIcon("List");
const TableIcon = pickIcon("Table");
const PageIcon = pickIcon("FileText");
const PieChartIcon = pickIcon("PieChart");
const BoxCubeIcon = pickIcon("Boxes", "Package");
const PlugInIcon = pickIcon("Plug");
const DocsIcon = pickIcon("FileText");
const MailIcon = pickIcon("Mail");
const HorizontaLDots = pickIcon("Ellipsis", "MoreHorizontal");
const ChatIcon = pickIcon("MessageCircle", "MessageSquare");
const MoreDotIcon = pickIcon("Ellipsis", "MoreHorizontal");
const AlertHexaIcon = pickIcon("TriangleAlert", "AlertTriangle");
const ErrorHexaIcon = pickIcon("CircleX", "XCircle");

export {
	ErrorHexaIcon,
	CheckIcon,
	KeyArrowDownIcon,
	PublicIcon,
	CommentIcon,
	VerifiedIcon,
	SupportAgentIcon,
	LocalShippingIcon,
	SearchIcon,
	FavoriteIcon,
	ShoppingBagIcon,
	StoreIcon,
	ShoppingCartIcon,
	AddShoppingCartIcon,
	AlertHexaIcon,
	MoreDotIcon,
	DownloadIcon,
	FileIcon,
	GridIcon,
	AudioIcon,
	VideoIcon,
	BoltIcon,
	PlusIcon,
	BoxIcon,
	CloseIcon,
	CheckCircleIcon,
	AlertIcon,
	InfoIcon,
	ErrorIcon,
	ArrowUpIcon,
	FolderIcon,
	ArrowDownIcon,
	ArrowRightIcon,
	GroupIcon,
	BoxIconLine,
	ShootingStarIcon,
	DollarLineIcon,
	TrashBinIcon,
	AngleUpIcon,
	AngleDownIcon,
	PencilIcon,
	CheckLineIcon,
	CloseLineIcon,
	ChevronDownIcon,
	PaperPlaneIcon,
	EnvelopeIcon,
	LockIcon,
	UserIcon,
	CalenderIcon,
	EyeIcon,
	EyeCloseIcon,
	TimeIcon,
	CopyIcon,
	ChevronLeftIcon,
	UserCircleIcon,
	TaskIcon,
	ListIcon,
	TableIcon,
	PageIcon,
	PieChartIcon,
	BoxCubeIcon,
	PlugInIcon,
	DocsIcon,
	MailIcon,
	HorizontaLDots,
	ChevronRightIcon,
	ChevronUpIcon,
	ChatIcon,
	AngleLeftIcon,
	AngleRightIcon,
};
