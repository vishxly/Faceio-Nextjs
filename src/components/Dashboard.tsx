// Dashboard.tsx
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaUserCircle, FaLock, FaCode, FaChartBar, FaSignOutAlt } from 'react-icons/fa';

interface DashboardProps {
  userEmail: string;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ userEmail, onLogout }) => {
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      <Card className="w-full bg-black text-white">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
          <div>
            <CardTitle className="text-2xl sm:text-3xl font-bold">Welcome to FaceIO</CardTitle>
            <p className="text-base sm:text-lg mt-2">Email: {userEmail}</p>
          </div>
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={onLogout}
            className="flex items-center w-full sm:w-auto justify-center mt-8"
          >
            <FaSignOutAlt className="mr-2" /> Logout
          </Button>
        </CardHeader>
        <CardContent>
          <p className="text-lg sm:text-xl mb-4">You have successfully logged in.</p>
        </CardContent>
      </Card>

      <h2 className="text-xl sm:text-2xl font-bold text-center my-6">Facial Authentication for the Web</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-base sm:text-lg">
              <FaUserCircle className="mr-2" /> Secure & Easy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm sm:text-base">Cross-browser, secure & easy to implement. Passwordless Authentication SDKs powered by Face Recognition for Web Sites & Apps.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-base sm:text-lg">
              <FaLock className="mr-2" /> Privacy-Focused
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm sm:text-base">Your facial data is encrypted and securely stored. We prioritize user privacy and data protection.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-base sm:text-lg">
              <FaCode className="mr-2" /> Developer-Friendly
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm sm:text-base">Easy integration with clear documentation. Get started quickly and implement facial authentication in your projects.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-base sm:text-lg">
              <FaChartBar className="mr-2" /> Analytics & Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm sm:text-base">Gain valuable insights into user authentication patterns and improve your applications security.</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
        <Button variant="default" size="lg" className="w-full sm:w-auto">
          Get Started →
        </Button>
        <Button variant="outline" size="lg" className="w-full sm:w-auto">
          Integration Guide →
        </Button>
        <Button variant="secondary" size="lg" className="w-full sm:w-auto">
          FACEIO Console →
        </Button>
      </div>

      <Card className="mt-8 bg-gray-100">
        <CardContent className="text-center py-6">
          <p className="text-base sm:text-lg font-semibold">Ready to implement facial authentication in your project?</p>
          <p className="mt-2 text-sm sm:text-base">Check out our documentation and start securing your application today!</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
