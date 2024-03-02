const FormContainer = ({ children }) => {
  return (
    <div className="flex justify-center h-screen items-center">
      <div className="card w-96 shadow-md bg-slate-100 p-4">{children}</div>
    </div>
  );
};

export default FormContainer;
