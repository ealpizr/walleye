const Head = ({ title }: { title: string }) => {
  return (
    <p className="w-full border-b-2 border-blue-400 pb-2 text-center text-lg font-bold">
      {title}
    </p>
  );
};

export default Head;
