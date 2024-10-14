export default function Button({ children, className} : { children: React.ReactNode, className?: string }) {
  return (
    <button className={"bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded "+className}>
        {children}
    </button>
  );
}