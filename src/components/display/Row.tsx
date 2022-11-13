const Row = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full flex-col justify-evenly gap-2 md:flex-row md:gap-6">
      {children}
    </div>
  );
};

export default Row;
