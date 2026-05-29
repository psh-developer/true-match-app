// import wordLogo from "@/assets/images/logo.png";
// import authSvg from "@/assets/svg/auth.svg";
// import Ripple from "@/components/magicui/ripple";
// import { ThemeToggle } from "@/components/theme/theme-toggle";

// interface AuthLayoutProps {
//   children: React.ReactNode;
// }

// export function AuthWrapper({ children }: AuthLayoutProps) {
//   return (
//     <div className="h-screen">
//       <div className="container overflow-hidden relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 mx-auto">
//         <div className="dark relative hidden h-full flex-col bg-background p-8 text-white dark:border-r lg:flex">
//           <div className="relative z-20">
//             <img src={wordLogo} className="flex h-12 invert dark:invert-0" />
//           </div>
//           <Ripple className="z-20" />
//           <div className="relative z-20 mt-auto w-full flex items-center justify-center">
//             <img alt="svg" src={authSvg} width={300} />
//           </div>
//           <div className="mt-auto" />
//         </div>
//         <div className="flex size-full flex-col justify-between px-8 py-4 md:px-0">
//           <div />
//           {children}
//           <div className="absolute top-4 right-4 flex items-center justify-center">
//             <ThemeToggle />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
