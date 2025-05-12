
import React, { useState } from "react";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockSettings } from "@/services/mockData";
import { toast } from "@/components/ui/use-toast";

const Settings: React.FC = () => {
  const [settings, setSettings] = useState(mockSettings);
  const [alertThreshold, setAlertThreshold] = useState([settings.alertThreshold]);
  
  const handleSaveSettings = () => {
    // In a real app, this would send the settings to the server
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully",
    });
  };

  const handleToggleAutopilot = (enabled: boolean) => {
    setSettings({
      ...settings,
      autopilot: enabled
    });
  };

  const handleToggleNotifications = (enabled: boolean) => {
    setSettings({
      ...settings,
      notificationsEnabled: enabled
    });
  };

  const handleChangeRiskProfile = (profile: string) => {
    setSettings({
      ...settings,
      riskProfile: profile
    });
  };

  const handleToggleEmailNotifications = (enabled: boolean) => {
    setSettings({
      ...settings,
      emailNotifications: enabled
    });
  };

  const handleToggleSmsNotifications = (enabled: boolean) => {
    setSettings({
      ...settings,
      smsNotifications: enabled
    });
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      email: e.target.value
    });
  };

  const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      phone: e.target.value
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-1">Settings</h1>
        <p className="text-muted-foreground">
          Configure your portfolio preferences and notifications
        </p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-6">
          <DashboardCard title="AutoPilot Settings" description="Configure AI-powered portfolio management">
            <div className="space-y-6">
              <div className="flex flex-row items-center justify-between">
                <div>
                  <Label htmlFor="autopilot-toggle" className="text-base font-medium">
                    AutoPilot Mode
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Allow AI to automatically adjust your portfolio based on market conditions and sentiment
                  </p>
                </div>
                <Switch
                  id="autopilot-toggle"
                  checked={settings.autopilot}
                  onCheckedChange={handleToggleAutopilot}
                />
              </div>

              <div className="space-y-3">
                <Label>Risk Profile</Label>
                <Select value={settings.riskProfile} onValueChange={handleChangeRiskProfile}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select risk profile" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="conservative">Conservative</SelectItem>
                    <SelectItem value="balanced">Balanced</SelectItem>
                    <SelectItem value="aggressive">Aggressive</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  {settings.riskProfile === "conservative" && "Lower risk, more stable returns, higher allocation to stable assets"}
                  {settings.riskProfile === "balanced" && "Moderate risk and return potential, diversified approach"}
                  {settings.riskProfile === "aggressive" && "Higher risk and potential returns, focus on growth assets"}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label htmlFor="alert-threshold">Alert Threshold (%)</Label>
                  <span className="text-sm">{alertThreshold[0]}%</span>
                </div>
                <Slider
                  id="alert-threshold"
                  min={1}
                  max={20}
                  step={1}
                  value={alertThreshold}
                  onValueChange={(value) => {
                    setAlertThreshold(value);
                    setSettings({
                      ...settings,
                      alertThreshold: value[0]
                    });
                  }}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Notify you when portfolio value changes by this percentage in a single day
                </p>
              </div>
            </div>
          </DashboardCard>

          <DashboardCard title="Trading Preferences" description="Configure trading behavior">
            <div className="space-y-4">
              <div>
                <Label>Rebalancing Frequency</Label>
                <Select defaultValue="weekly">
                  <SelectTrigger>
                    <SelectValue placeholder="Select rebalancing frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="tax-loss-harvesting" className="block mb-1">
                    Tax Loss Harvesting
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Allow AI to optimize tax efficiency
                  </p>
                </div>
                <Switch id="tax-loss-harvesting" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="fractional-shares" className="block mb-1">
                    Allow Fractional Shares
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Enable trading with fractional shares
                  </p>
                </div>
                <Switch id="fractional-shares" defaultChecked />
              </div>
            </div>
          </DashboardCard>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-6">
          <DashboardCard title="Notification Settings" description="Configure when and how you receive alerts">
            <div className="space-y-6">
              <div className="flex flex-row items-center justify-between">
                <div>
                  <Label htmlFor="notifications-toggle" className="text-base font-medium">
                    Enable Notifications
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receive alerts about important market and portfolio events
                  </p>
                </div>
                <Switch
                  id="notifications-toggle"
                  checked={settings.notificationsEnabled}
                  onCheckedChange={handleToggleNotifications}
                />
              </div>

              {settings.notificationsEnabled && (
                <>
                  <div className="space-y-4">
                    <h3 className="font-medium">Notification Methods</h3>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-notifications" className="block">
                          Email Notifications
                        </Label>
                      </div>
                      <Switch
                        id="email-notifications"
                        checked={settings.emailNotifications}
                        onCheckedChange={handleToggleEmailNotifications}
                      />
                    </div>
                    
                    {settings.emailNotifications && (
                      <div>
                        <Label htmlFor="email-input">Email Address</Label>
                        <Input
                          id="email-input"
                          type="email"
                          placeholder="your.email@example.com"
                          value={settings.email}
                          onChange={handleChangeEmail}
                        />
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="sms-notifications" className="block">
                          SMS Notifications
                        </Label>
                      </div>
                      <Switch
                        id="sms-notifications"
                        checked={settings.smsNotifications}
                        onCheckedChange={handleToggleSmsNotifications}
                      />
                    </div>
                    
                    {settings.smsNotifications && (
                      <div>
                        <Label htmlFor="phone-input">Phone Number</Label>
                        <Input
                          id="phone-input"
                          type="tel"
                          placeholder="+12345678900"
                          value={settings.phone}
                          onChange={handleChangePhone}
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Notification Types</h3>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="portfolio-alerts" className="block">
                          Portfolio Alerts
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Changes in portfolio value exceeding threshold
                        </p>
                      </div>
                      <Switch id="portfolio-alerts" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="sentiment-alerts" className="block">
                          Sentiment Alerts
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Significant sentiment changes for your holdings
                        </p>
                      </div>
                      <Switch id="sentiment-alerts" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="trade-alerts" className="block">
                          Trade Notifications
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Alerts when AutoPilot makes trades
                        </p>
                      </div>
                      <Switch id="trade-alerts" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="market-alerts" className="block">
                          Market News
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Major market-moving news relevant to your portfolio
                        </p>
                      </div>
                      <Switch id="market-alerts" />
                    </div>
                  </div>
                </>
              )}
            </div>
          </DashboardCard>
        </TabsContent>
        
        <TabsContent value="account" className="space-y-6">
          <DashboardCard title="Account Settings" description="Manage your user account">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name-input">Full Name</Label>
                <Input id="name-input" defaultValue="John Doe" />
              </div>
              
              <div>
                <Label htmlFor="email-input">Email Address</Label>
                <Input id="email-input" type="email" defaultValue="john.doe@example.com" />
              </div>
              
              <div className="pt-2">
                <Button variant="outline">Change Password</Button>
              </div>
            </div>
          </DashboardCard>

          <DashboardCard title="Data & Privacy" description="Manage how your data is used">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="analytics-toggle" className="block mb-1">
                    Usage Analytics
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Allow anonymous usage data collection to improve the app
                  </p>
                </div>
                <Switch id="analytics-toggle" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="personalization-toggle" className="block mb-1">
                    Personalized Recommendations
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Use your data to provide more relevant investment suggestions
                  </p>
                </div>
                <Switch id="personalization-toggle" defaultChecked />
              </div>
              
              <div className="pt-2">
                <Button variant="outline">Download My Data</Button>
              </div>
            </div>
          </DashboardCard>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end">
        <Button onClick={handleSaveSettings}>Save Settings</Button>
      </div>
    </div>
  );
};

export default Settings;
