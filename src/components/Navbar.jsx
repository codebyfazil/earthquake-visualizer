export default function Navbar() {
  return (
    <nav className="w-full bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md ">
      
      <h1 className="text-xl font-bold">Earthquake Tracker</h1>

      <ul className="hidden md:flex space-x-6 text-sm">
      
        
          <a href="#earthquakes" className="hover:text-yellow-300"></a>
       
      </ul>
    </nav>
  );
}
