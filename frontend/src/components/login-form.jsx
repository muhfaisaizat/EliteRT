import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { API_URL } from "../helpers/networt";
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfrim, setNewPasswordConfrim] = useState("");
  const [emailExists, setEmailExists] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      if (response.status === 200) {
        const userRole = response.data.user.role;
        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("role", userRole);
        localStorage.setItem("email", response.data.user.email);
        localStorage.setItem("idUser", JSON.stringify(response.data.user.id));
        navigate(userRole === "admin" ? "/panel" : "/");
      }
    } catch (err) {
      setError("Login gagal! Periksa kembali email dan password.");
    }
  };

  const checkEmail = async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/check-email?email=${email}`);
      setError("")
      setEmailExists(response.data.message);
    } catch (err) {
      setEmailExists(false);
      setError("Email tidak ditemukan!");
    }
  };

  const resetPassword = async () => {
    if (!newPassword || !newPasswordConfrim) {
      setError("Password tidak boleh kosong.");
      return;
    }
    if (newPassword.length < 8) {
      setError("Password harus minimal 8 karakter.");
      return;
    }
    if (newPassword !== newPasswordConfrim) {
      setError("Password tidak cocok.");
      return;
    }
    try {
      await axios.put(`${API_URL}/auth/forgot-password`, {
        email,
        new_password: newPassword
      });
      setShowForgotPassword(false);
      setEmailExists(false);
      setError("");
      toast({
        description: "Password diperbarui, silakan login kembali menggunakan password baru",
      });
    } catch (err) {
      setError("Gagal mereset password.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen  px-4">
      <Card className="w-full max-w-md px-4 py-6 shadow-lg border">
        <CardHeader className="grid justify-center">
          <CardTitle className="text-2xl text-center">
            {showForgotPassword ? "Lupa Password" : "Login"}
          </CardTitle>
          <CardDescription>
            {showForgotPassword
              ? "Masukkan email untuk reset password"
              : "Masukkan email dan password untuk login"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {showForgotPassword ? (
            <div className="flex flex-col gap-4">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {!emailExists && (
                <>
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <Button onClick={checkEmail} className="w-full ">
                    Cek Email
                  </Button>
                </>
              )}
              {emailExists && (
                <>
                  <Label htmlFor="newPassword">Password Baru</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <Label htmlFor="newPasswordConfrim">Konfirmasi Password Baru</Label>
                  <Input
                    id="newPasswordConfrim"
                    type="password"
                    value={newPasswordConfrim}
                    onChange={(e) => setNewPasswordConfrim(e.target.value)}
                    required
                  />
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <Button onClick={resetPassword} className="w-full ">
                    Simpan
                  </Button>
                </>
              )}
              <Button
                variant="outline"
                onClick={() => {
                  setShowForgotPassword(false);
                  setEmailExists(false);
                  setError("");
                  setNewPassword("");
                  setNewPasswordConfrim("");
                }}
              >
                Kembali ke Login
              </Button>
            </div>
          ) : (
            <form onSubmit={handleLogin} className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  onInvalid={(e) => e.target.setCustomValidity('Email wajib diisi')}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <button
                    type="button"
                    onClick={() => { setShowForgotPassword(true); setError(""); }}
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Lupa password?
                  </button>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  onInvalid={(e) => e.target.setCustomValidity('Password wajib diisi')}
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button type="submit" className="w-full ">
                Login
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
