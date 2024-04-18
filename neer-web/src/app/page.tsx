import Form from "@/components/form";

const Signin = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <Brand />
      <Form />
    </div>
  );
};

export default Signin;

const Brand = () => (
  <div className="brand flex h-full w-full basis-1/3 items-center justify-center bg-black font-montserrat text-7xl font-bold text-white">
    <h1>Neersolve.</h1>
  </div>
);
