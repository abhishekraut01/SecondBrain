import { useForm } from "react-hook-form";

type FormData = {
  link: string;
  type: "youtube" | "instagram" | "twitter" | "facebook" | "artical" | "other";
  title: string;
  description?: string;
};

export const ContentForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Submitted Data:", data);
    alert("Form Submitted Successfully!");
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Add New Content</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Link Input */}
        <div>
          <label className="block text-gray-700 font-medium">Link</label>
          <input
            type="url"
            {...register("link", { required: "Link is required" })}
            className="w-full p-2 border rounded-md"
            placeholder="Enter link (e.g. https://example.com)"
          />
          {errors.link && <p className="text-red-500 text-sm">{errors.link.message}</p>}
        </div>

        {/* Type Dropdown */}
        <div>
          <label className="block text-gray-700 font-medium">Type</label>
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
        </div>

        {/* Title Input */}
        <div>
          <label className="block text-gray-700 font-medium">Title</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="w-full p-2 border rounded-md"
            placeholder="Enter title"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        {/* Description Input */}
        <div>
          <label className="block text-gray-700 font-medium">Description</label>
          <textarea
            {...register("description")}
            className="w-full p-2 border rounded-md"
            placeholder="Enter description (optional)"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full bg-purple-600 text-white p-2 rounded-md hover:bg-purple-500">
          Submit
        </button>
      </form>
    </div>
  );
};
