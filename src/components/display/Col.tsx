const Col = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <div className="md:text-center">
      <p className="font-bold text-blue-500">{title}</p>
      {children}
    </div>
  );
};

export default Col;
