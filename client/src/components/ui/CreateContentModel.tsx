export const CreateContentModel = ({ open }: { open: boolean }) => {
    return (
      <>
        {open && (
          <div className="fixed inset-0 bg-slate-200/30 backdrop-blur-md flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg  ">
              <h2 className="text-lg font-semibold">Your Modal</h2>
              <p>Modal content here...</p>
            </div>
          </div>
        )}
      </>
    );
  };
  