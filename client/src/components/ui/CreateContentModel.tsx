import { RxCross1 } from "react-icons/rx";
import { Button } from "./Button";
import { useForm } from "react-hook-form";

interface CreateContentModelProps {
  open: boolean;
  onClose: () => void; // Function to close modal
}

type FormData = {
  link: string;
  title: string;
  description: string;
  type: "youtube" | "instagram" | "twitter" | "facebook" | "artical" | "other";
};

export const CreateContentModel = ({ open, onClose }: CreateContentModelProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
    alert("Form Submitted Successfully!");
    onClose(); // Close modal after submission
  };

  if (!open) return null; // Don't render if not open

  return (
    <div className="fixed inset-0 bg-slate-200/30 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
        {/* Close Button */}
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            <RxCross1 size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {/* Link Input */}
          <input
            {...register("link", { required: "Link is required" })}
            className="w-full p-2 border rounded-md"
            type="url"
            placeholder="Enter Link"
          />
          {errors.link && <p className="text-red-500 text-sm">{errors.link.message}</p>}

          {/* Title Input */}
          <input
            {...register("title", { required: "Title is required" })}
            className="w-full p-2 border rounded-md"
            type="text"
            placeholder="Enter Title"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

          {/* Description Input */}
          <textarea
            {...register("description")}
            className="w-full p-2 border rounded-md"
            placeholder="Enter Description"
          ></textarea>

          {/* Type Dropdown */}
          <select
            {...register("type", { required: "Type is required" })}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select Type</option>
            <option value="youtube">YouTube</option>
            <option value="instagram">Instagram</option>
            <option value="twitter">Twitter</option>
            <option value="facebook">Facebook</option>
            <option value="artical">Article</option>
            <option value="other">Other</option>
          </select>
          {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button variant="primary" size="md" >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
