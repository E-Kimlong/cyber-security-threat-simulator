
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Lock, Database, Zap, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const AttackSimulator = () => {
  const [phishingEmail, setPhishingEmail] = useState("");
  const [bruteForceTarget, setBruteForceTarget] = useState("");
  const [sqlPayload, setSqlPayload] = useState("");
  const [ddosTarget, setDdosTarget] = useState("");
  const { toast } = useToast();

  const generatePhishingEmail = () => {
    const templates = [
      {
        subject: "Urgent: Account Security Alert",
        body: `Dear User,\n\nWe have detected suspicious activity on your account. Please click the link below to verify your identity immediately:\n\nhttp://fake-bank-security.com/verify\n\nFailure to verify within 24 hours will result in account suspension.\n\nBest regards,\nSecurity Team`
      },
      {
        subject: "IT Support: Password Expiration Notice",
        body: `Hello,\n\nYour password will expire in 24 hours. Please update it using the link below:\n\nhttp://company-it-portal.com/update\n\nIf you don't update your password, you may lose access to company systems.\n\nIT Support Team`
      }
    ];
    
    const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
    setPhishingEmail(`Subject: ${randomTemplate.subject}\n\n${randomTemplate.body}`);
    
    toast({
      title: "Phishing Email Generated",
      description: "Educational phishing email template created for awareness training.",
    });
  };

  const simulateBruteForce = () => {
    if (!bruteForceTarget) return;
    
    const commonPasswords = ["123456", "password", "admin", "qwerty", "letmein"];
    const attempts = Math.floor(Math.random() * 50) + 10;
    
    toast({
      title: "Brute Force Simulation",
      description: `Simulated ${attempts} password attempts against ${bruteForceTarget}. Common passwords tested: ${commonPasswords.slice(0, 3).join(", ")}...`,
    });
  };

  const testSqlInjection = () => {
    if (!sqlPayload) return;
    
    const vulnerabilities = [
      "Union-based SQL injection detected",
      "Boolean-based blind SQL injection possible",
      "Time-based blind SQL injection vulnerable"
    ];
    
    const randomVuln = vulnerabilities[Math.floor(Math.random() * vulnerabilities.length)];
    
    toast({
      title: "SQL Injection Test",
      description: randomVuln,
      variant: "destructive"
    });
  };

  const simulateDdos = () => {
    if (!ddosTarget) return;
    
    const requestsPerSecond = Math.floor(Math.random() * 1000) + 500;
    
    toast({
      title: "DDoS Simulation",
      description: `Simulating ${requestsPerSecond} requests/second to ${ddosTarget}. This is for educational purposes only.`,
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-red-400 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Attack Simulation Module
          </CardTitle>
          <CardDescription className="text-slate-400">
            Educational attack simulations for security training and awareness
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="phishing" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800 border border-slate-700">
          <TabsTrigger value="phishing" className="data-[state=active]:bg-red-600">
            <Mail className="w-4 h-4 mr-2" />
            Phishing
          </TabsTrigger>
          <TabsTrigger value="bruteforce" className="data-[state=active]:bg-orange-600">
            <Lock className="w-4 h-4 mr-2" />
            Brute Force
          </TabsTrigger>
          <TabsTrigger value="sqli" className="data-[state=active]:bg-purple-600">
            <Database className="w-4 h-4 mr-2" />
            SQL Injection
          </TabsTrigger>
          <TabsTrigger value="ddos" className="data-[state=active]:bg-yellow-600">
            <Zap className="w-4 h-4 mr-2" />
            DDoS
          </TabsTrigger>
        </TabsList>

        <TabsContent value="phishing" className="mt-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-red-400">Phishing Email Generator</CardTitle>
              <CardDescription className="text-slate-400">
                Generate realistic phishing emails for security awareness training
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={generatePhishingEmail}
                className="bg-red-600 hover:bg-red-700"
              >
                Generate Phishing Email
              </Button>
              
              {phishingEmail && (
                <div className="space-y-2">
                  <Badge className="bg-red-600 text-white">⚠️ EDUCATIONAL PURPOSE ONLY</Badge>
                  <Textarea
                    value={phishingEmail}
                    readOnly
                    rows={10}
                    className="bg-slate-700 border-slate-600 text-slate-200 font-mono text-sm"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bruteforce" className="mt-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-orange-400">Brute Force Attack Simulator</CardTitle>
              <CardDescription className="text-slate-400">
                Test password strength against common attack patterns
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Target system (e.g., 192.168.1.100:22)"
                value={bruteForceTarget}
                onChange={(e) => setBruteForceTarget(e.target.value)}
                className="bg-slate-700 border-slate-600 text-green-400"
              />
              <Button 
                onClick={simulateBruteForce}
                disabled={!bruteForceTarget}
                className="bg-orange-600 hover:bg-orange-700"
              >
                Simulate Brute Force Attack
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sqli" className="mt-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-purple-400">SQL Injection Tester</CardTitle>
              <CardDescription className="text-slate-400">
                Test web applications for SQL injection vulnerabilities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Enter SQL injection payload (e.g., ' OR '1'='1)"
                value={sqlPayload}
                onChange={(e) => setSqlPayload(e.target.value)}
                className="bg-slate-700 border-slate-600 text-green-400 font-mono"
                rows={3}
              />
              <Button 
                onClick={testSqlInjection}
                disabled={!sqlPayload}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Test SQL Injection
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ddos" className="mt-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-yellow-400">DDoS Attack Simulator</CardTitle>
              <CardDescription className="text-slate-400">
                Simulate distributed denial of service attacks for testing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Target URL or IP (e.g., testserver.local)"
                value={ddosTarget}
                onChange={(e) => setDdosTarget(e.target.value)}
                className="bg-slate-700 border-slate-600 text-green-400"
              />
              <Button 
                onClick={simulateDdos}
                disabled={!ddosTarget}
                className="bg-yellow-600 hover:bg-yellow-700"
              >
                Simulate DDoS Attack
              </Button>
              <div className="p-3 bg-yellow-900/20 border border-yellow-600 rounded">
                <p className="text-yellow-400 text-sm">
                  ⚠️ This simulation generates fake traffic for educational purposes only. 
                  Never use against systems you don't own.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
