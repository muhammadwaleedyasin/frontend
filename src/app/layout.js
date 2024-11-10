
import { Poppins } from "next/font/google";
import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ProviderComp } from "@/components/provider/provider";
import { Toaster } from "react-hot-toast";


// Import the Poppins font
const poppins = Poppins({ subsets: ["latin"], weight: ["200", "300", "400", "500", "600", "700", "800", "900"] });

export const metadata = {
  title: "Rent Private Villas",
  description: "Discover our range of beautiful private villas in Pakistan",
  keywords: ["Rent", "Private", "Villas"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <div>
          {/* <Navbar /> */}
          <GoogleOAuthProvider clientId={process.env.clientId}>
            <ProviderComp>
              {children}
              <Toaster/>
              </ProviderComp>
              </GoogleOAuthProvider>

          {/* <Footer /> */}
        </div>
      </body>
    </html>
  );
}
