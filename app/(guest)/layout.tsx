import Navbar from "../components/Navbar"; // Pakai alias @ biar rapi
import BackgroundOrbs from "../components/BackgroundOrbs";
import "leaflet/dist/leaflet.css";

export default function GuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BackgroundOrbs />
      <Navbar />
      {children}
    </>
  );
}