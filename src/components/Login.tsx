/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Terminal } from "lucide-react";
import { MailIcon, CheckCircleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import faceIO from "@faceio/fiojs";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import Dashboard from "./Dashboard";

type Props = {};

const Login: React.FC<Props> = ({}) => {
  const faceioRef = useRef<faceIO | null>(null);
  const [email, setEmail] = useState("");
  const [userLogin, setUserLogin] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const publicKey = process.env.NEXT_PUBLIC_FACEIO_PUBLIC_ID as string;

  const initialiseFaceio = async () => {
    try {
      faceioRef.current = new faceIO(publicKey);
      console.log("FaceIO initialized successfully");
    } catch (error) {
      console.log(error);
      handleError(error);
    }
  };

  useEffect(() => {
    initialiseFaceio();
  }, []);

  const handleRegister = async () => {
    try {
      if (!faceioRef.current) {
        console.error("FaceIO instance is not initialized");
        return;
      }

      await faceioRef.current?.enroll({
        userConsent: false,
        locale: "auto",
        payload: { email: `${email}` },
      });
      toast.success("Successfully Registered user.");
    } catch (error) {
      handleError(error);
      faceioRef.current?.restartSession();
    }
  };

  const handleLogin = async () => {
    try {
      const authenticate = await faceioRef.current?.authenticate();
      console.log("User authenticated successfully:", authenticate);
      setUserLogin(authenticate.payload.email);
      setIsLoggedIn(true);
      toast.success("Successfully logged in.");
    } catch (error) {
      console.log(error);
      handleError(error);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserLogin("");
    toast.success("Successfully logged out.");
  };

  function handleError(errCode: any) {
    const fioErrs = faceioRef.current?.fetchAllErrorCodes()!;
    switch (errCode) {
      case fioErrs.PERMISSION_REFUSED:
        toast.info("Access to the Camera stream was denied by the end user");
        break;
      case fioErrs.NO_FACES_DETECTED:
        toast.info(
          "No faces were detected during the enroll or authentication process"
        );
        break;
      case fioErrs.UNRECOGNIZED_FACE:
        toast.info("Unrecognized face on this application's Facial Index");
        break;
      case fioErrs.MANY_FACES:
        toast.info("Two or more faces were detected during the scan process");
        break;
      case fioErrs.FACE_DUPLICATION:
        toast.info(
          "User enrolled previously (facial features already recorded). Cannot enroll again!"
        );
        break;
      case fioErrs.MINORS_NOT_ALLOWED:
        toast.info("Minors are not allowed to enroll on this application!");
        break;
      case fioErrs.PAD_ATTACK:
        toast.info(
          "Presentation (Spoof) Attack (PAD) detected during the scan process"
        );
        break;
      case fioErrs.FACE_MISMATCH:
        toast.info(
          "Calculated Facial Vectors of the user being enrolled do not matches"
        );
        break;
      case fioErrs.WRONG_PIN_CODE:
        toast.info("Wrong PIN code supplied by the user being authenticated");
        break;
      case fioErrs.PROCESSING_ERR:
        toast.info("Server side error");
        break;
      case fioErrs.UNAUTHORIZED:
        toast.info(
          "Your application is not allowed to perform the requested operation (eg. Invalid ID, Blocked, Paused, etc.). Refer to the FACEIO Console for additional information"
        );
        break;
      case fioErrs.TERMS_NOT_ACCEPTED:
        toast.info(
          "Terms & Conditions set out by FACEIO/host application rejected by the end user"
        );
        break;
      case fioErrs.UI_NOT_READY:
        toast.info(
          "The FACEIO Widget could not be (or is being) injected onto the client DOM"
        );
        break;
      case fioErrs.SESSION_EXPIRED:
        toast.info(
          "Client session expired. The first promise was already fulfilled but the host application failed to act accordingly"
        );
        break;
      case fioErrs.TIMEOUT:
        toast.info(
          "Ongoing operation timed out (eg, Camera access permission, ToS accept delay, Face not yet detected, Server Reply, etc.)"
        );
        break;
      case fioErrs.TOO_MANY_REQUESTS:
        toast.info(
          "Widget instantiation requests exceeded for freemium applications. Does not apply for upgraded applications"
        );
        break;
      case fioErrs.EMPTY_ORIGIN:
        toast.info("Origin or Referer HTTP request header is empty or missing");
        break;
      case fioErrs.FORBIDDDEN_ORIGIN:
        toast.info("Domain origin is forbidden from instantiating fio.js");
        break;
      case fioErrs.FORBIDDDEN_COUNTRY:
        toast.info(
          "Country ISO-3166-1 Code is forbidden from instantiating fio.js"
        );
        break;
      case fioErrs.SESSION_IN_PROGRESS:
        toast.info(
          "Another authentication or enrollment session is in progress"
        );
        break;
      case fioErrs.NETWORK_IO:
      default:
        toast.info(
          "Error while establishing network connection with the target FACEIO processing node"
        );
        break;
    }
  }

  if (isLoggedIn) {
    return <Dashboard userEmail={userLogin} onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center p-4 w-full">
      <Card className="w-[400px] bg-white shadow-xl rounded-xl overflow-hidden">
        <CardHeader className="bg-gray-50 border-b p-6">
          <CardTitle className="text-2xl font-bold text-gray-800">
            Secure Workspace
          </CardTitle>
          <CardDescription className="text-sm text-gray-600">
            Authenticate to access your personalized work environment
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Work Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@company.com"
              className="w-full px-3 py-2 border rounded-md"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-4">
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition duration-300 ease-in-out"
              onClick={handleLogin}
            >
              Access Workspace
            </Button>
            <Button
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 rounded-md transition duration-300 ease-in-out"
              onClick={handleRegister}
              disabled={!email.includes("@")}
            >
              Register New Account
            </Button>
          </div>
        </CardContent>
        <CardFooter className="bg-gray-50 border-t p-4">
          <div className="w-full text-center text-xs text-gray-500">
            Protected by FaceIO™ Technology.
            <Link
              href="https://faceio.net/security-policy"
              className="text-blue-600 hover:underline ml-1"
            >
              Learn about our security measures
            </Link>
          </div>
        </CardFooter>
      </Card>

      {userLogin && !isLoggedIn && (
        <div className="fixed bottom-4 right-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md shadow-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <CheckCircleIcon className="h-5 w-5 text-green-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">Workspace Access Granted</p>
              <p className="text-xs mt-1">Logged in as: {userLogin}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
