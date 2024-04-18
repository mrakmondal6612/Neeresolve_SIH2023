/* eslint-disable @next/next/no-img-element */
const Topbar = ({
  title = "Dashboard",
  components,
}: {
  title?: string;
  components?: (() => JSX.Element)[];
}) => {
  return (
    <header className="flex items-center justify-between font-montserrat text-2xl font-bold">
      <h2>{title}</h2>
      <div className="right flex items-center gap-4">
        {components?.map((Component, index) => <Component key={index} />)}
        <div className="avatar h-10 w-10">
          <img
            src="https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/avat-01-512.png"
            alt=""
          />
        </div>
      </div>
    </header>
  );
};

export default Topbar;
