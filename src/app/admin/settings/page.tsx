'use client';

import React, { useState } from 'react';
import { AppShell } from '../../../components/layout/AppShell';
import {
  School,
  Lock,
  Database,
  FileCheck2,
  RotateCcw,
  ShieldCheck,
  Save,
  CheckCircle2,
  X,
} from 'lucide-react';
import {
  settingsService,
  AllSchoolSettings,
} from '../../../services/settings.service';

type EditingCard = 'identity' | 'security' | 'storage' | 'cv' | null;

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<AllSchoolSettings>(() =>
    settingsService.getCachedSettings()
  );
  const [editingCard, setEditingCard] = useState<EditingCard>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  // Form states initialized with current settings
  const [identityForm, setIdentityForm] = useState(settings.identity);
  const [securityForm, setSecurityForm] = useState(settings.security);
  const [storageForm, setStorageForm] = useState(settings.storage);
  const [cvForm, setCvForm] = useState(settings.cvPolicy);

  const startEdit = (card: EditingCard) => {
    if (card === 'identity') setIdentityForm({ ...settings.identity });
    if (card === 'security') setSecurityForm({ ...settings.security });
    if (card === 'storage') setStorageForm({ ...settings.storage });
    if (card === 'cv') setCvForm({ ...settings.cvPolicy });
    setEditingCard(card);
  };

  const showFeedback = (text: string) => {
    setFeedbackMsg(text);
    setTimeout(() => setFeedbackMsg(null), 4000);
  };

  const handleSaveIdentity = async (e: React.FormEvent) => {
    e.preventDefault();
    const updated = await settingsService.updateSettings({ identity: identityForm });
    setSettings(updated);
    setEditingCard(null);
    showFeedback('Identitas sekolah dan tahun akademik berhasil disimpan.');
  };

  const handleSaveSecurity = async (e: React.FormEvent) => {
    e.preventDefault();
    const updated = await settingsService.updateSettings({ security: securityForm });
    setSettings(updated);
    setEditingCard(null);
    showFeedback('Kebijakan keamanan otentikasi berhasil disimpan.');
  };

  const handleSaveStorage = async (e: React.FormEvent) => {
    e.preventDefault();
    const updated = await settingsService.updateSettings({ storage: storageForm });
    setSettings(updated);
    setEditingCard(null);
    showFeedback('Konfigurasi storage & kuota berhasil disimpan.');
  };

  const handleSaveCv = async (e: React.FormEvent) => {
    e.preventDefault();
    const updated = await settingsService.updateSettings({ cvPolicy: cvForm });
    setSettings(updated);
    setEditingCard(null);
    showFeedback('Kebijakan Digital CV dan verifikasi publik berhasil disimpan.');
  };

  const handleResetDefaults = async () => {
    const res = await settingsService.resetToDefault();
    setSettings(res);
    setIdentityForm(res.identity);
    setSecurityForm(res.security);
    setStorageForm(res.storage);
    setCvForm(res.cvPolicy);
    setEditingCard(null);
    showFeedback('Semua pengaturan sekolah telah dikembalikan ke standar awal.');
  };

  return (
    <AppShell pageTitle="School Settings" expectedRole="admin" isPageLoading={false}>
      <div className="space-y-6 max-w-6xl mx-auto">
        {/* Header matching exact layout */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#261331] tracking-tight">
              School Settings
            </h1>
            <p className="text-sm text-[#6F607D] mt-1">
              Konfigurasi institusi, keamanan, storage, dan kebijakan CV.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleResetDefaults}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-[#E9E1F4] bg-white text-xs font-bold text-[#6F607D] hover:text-[#261331] hover:border-purple-300 transition-all shadow-2xs"
              title="Reset ke pengaturan bawaan"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Default</span>
            </button>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F3E8FF] border border-purple-200 text-[#6D28D9] font-bold text-xs shadow-xs self-start sm:self-auto">
              <span>{settings.identity.academicYear.split(' ')[0]} • Semester 1</span>
            </div>
          </div>
        </div>

        {/* Feedback Banner */}
        {feedbackMsg && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-between animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{feedbackMsg}</span>
            </div>
            <button
              type="button"
              onClick={() => setFeedbackMsg(null)}
              className="text-emerald-700 hover:text-emerald-900"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Identitas Sekolah */}
          <div className="bg-white rounded-[18px] border border-[#E9E1F4] p-6 sm:p-7 shadow-[0_4px_16px_rgba(76,29,149,0.06)] flex flex-col justify-between transition-all">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 text-[#6D28D9] flex items-center justify-center">
                    <School className="w-4 h-4" />
                  </div>
                  <h2 className="text-base font-extrabold text-[#261331]">Identitas Sekolah</h2>
                </div>
                {editingCard === 'identity' && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-[#6D28D9]">
                    Mode Edit
                  </span>
                )}
              </div>

              {editingCard === 'identity' ? (
                /* Formulir Edit Identitas Sekolah */
                <form onSubmit={handleSaveIdentity} className="space-y-3 text-xs pt-1">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Nama sekolah:</label>
                    <input
                      type="text"
                      required
                      value={identityForm.schoolName}
                      onChange={(e) => setIdentityForm({ ...identityForm, schoolName: e.target.value })}
                      className="w-full p-2 border border-purple-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Tahun akademik:</label>
                    <input
                      type="text"
                      required
                      value={identityForm.academicYear}
                      onChange={(e) => setIdentityForm({ ...identityForm, academicYear: e.target.value })}
                      className="w-full p-2 border border-purple-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">NPSN:</label>
                      <input
                        type="text"
                        value={identityForm.npsn}
                        onChange={(e) => setIdentityForm({ ...identityForm, npsn: e.target.value })}
                        className="w-full p-2 border border-purple-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Semester:</label>
                      <select
                        value={identityForm.semester}
                        onChange={(e) => setIdentityForm({ ...identityForm, semester: e.target.value })}
                        className="w-full p-2 border border-purple-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                      >
                        <option value="Semester 1 (Ganjil)">Semester 1 (Ganjil)</option>
                        <option value="Semester 2 (Genap)">Semester 2 (Genap)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-3">
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl tal-btn-primary font-bold text-xs shadow-md inline-flex items-center gap-1.5"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Simpan</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingCard(null)}
                      className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
                    >
                      Batal
                    </button>
                  </div>
                </form>
              ) : (
                /* Tampilan Data Identitas Sekolah */
                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between py-2 border-b border-[#E9E1F4]">
                    <span className="font-semibold text-[#6F607D]">Nama sekolah</span>
                    <span className="font-bold text-[#261331]">{settings.identity.schoolName}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-[#E9E1F4]">
                    <span className="font-semibold text-[#6F607D]">Tahun akademik</span>
                    <span className="font-bold text-[#261331]">{settings.identity.academicYear}</span>
                  </div>
                </div>
              )}
            </div>

            {editingCard !== 'identity' && (
              <div className="pt-6">
                <button
                  type="button"
                  onClick={() => startEdit('identity')}
                  className="px-6 py-2.5 rounded-xl tal-btn-primary font-bold text-xs shadow-md"
                >
                  Edit data
                </button>
              </div>
            )}
          </div>

          {/* Card 2: Keamanan */}
          <div className="bg-white rounded-[18px] border border-[#E9E1F4] p-6 sm:p-7 shadow-[0_4px_16px_rgba(76,29,149,0.06)] flex flex-col justify-between transition-all">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 text-[#6D28D9] flex items-center justify-center">
                    <Lock className="w-4 h-4" />
                  </div>
                  <h2 className="text-base font-extrabold text-[#261331]">Keamanan</h2>
                </div>
                {editingCard === 'security' && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-[#6D28D9]">
                    Mode Edit
                  </span>
                )}
              </div>

              {editingCard === 'security' ? (
                /* Formulir Edit Keamanan */
                <form onSubmit={handleSaveSecurity} className="space-y-3 text-xs pt-1">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Demo login:</label>
                    <select
                      value={securityForm.demoLogin ? 'ON' : 'OFF'}
                      onChange={(e) => setSecurityForm({ ...securityForm, demoLogin: e.target.value === 'ON' })}
                      className="w-full p-2 border border-purple-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                    >
                      <option value="ON">ON (Aktif)</option>
                      <option value="OFF">OFF (Nonaktif)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Secure cookie:</label>
                    <select
                      value={securityForm.secureCookie}
                      onChange={(e) => setSecurityForm({ ...securityForm, secureCookie: e.target.value })}
                      className="w-full p-2 border border-purple-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                    >
                      <option value="ON">ON (HttpOnly, SameSite=Lax)</option>
                      <option value="STRICT">STRICT (SameSite=Strict)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">RBAC:</label>
                    <select
                      value={securityForm.rbacMode}
                      onChange={(e) => setSecurityForm({ ...securityForm, rbacMode: e.target.value })}
                      className="w-full p-2 border border-purple-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                    >
                      <option value="STRICT">STRICT (Server Enforced)</option>
                      <option value="STANDARD">STANDARD</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2 pt-3">
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow-md inline-flex items-center gap-1.5"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Simpan</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingCard(null)}
                      className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
                    >
                      Batal
                    </button>
                  </div>
                </form>
              ) : (
                /* Tampilan Data Keamanan */
                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between py-2 border-b border-[#E9E1F4]">
                    <span className="font-semibold text-[#6F607D]">Demo login</span>
                    <span className="font-bold text-[#261331]">{settings.security.demoLogin ? 'ON' : 'OFF'}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-[#E9E1F4]">
                    <span className="font-semibold text-[#6F607D]">Secure cookie</span>
                    <span className="font-bold text-[#261331]">{settings.security.secureCookie}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-[#E9E1F4]">
                    <span className="font-semibold text-[#6F607D]">RBAC</span>
                    <span className="font-bold text-[#261331]">{settings.security.rbacMode}</span>
                  </div>
                </div>
              )}
            </div>

            {editingCard !== 'security' && (
              <div className="pt-6">
                <button
                  type="button"
                  onClick={() => startEdit('security')}
                  className="px-6 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow-md transition-colors"
                >
                  Security policy
                </button>
              </div>
            )}
          </div>

          {/* Card 3: Storage & Upload */}
          <div className="bg-white rounded-[18px] border border-[#E9E1F4] p-6 sm:p-7 shadow-[0_4px_16px_rgba(76,29,149,0.06)] flex flex-col justify-between transition-all">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 text-[#6D28D9] flex items-center justify-center">
                    <Database className="w-4 h-4" />
                  </div>
                  <h2 className="text-base font-extrabold text-[#261331]">Storage &amp; Upload</h2>
                </div>
                {editingCard === 'storage' && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-[#6D28D9]">
                    Mode Edit
                  </span>
                )}
              </div>

              {editingCard === 'storage' ? (
                /* Formulir Edit Storage */
                <form onSubmit={handleSaveStorage} className="space-y-3 text-xs pt-1">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Free-tier mode:</label>
                    <select
                      value={storageForm.freeTier}
                      onChange={(e) => setStorageForm({ ...storageForm, freeTier: e.target.value })}
                      className="w-full p-2 border border-purple-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                    >
                      <option value="ON">ON (Cloudflare R2 Free Tier)</option>
                      <option value="OFF">OFF (Dedicated S3)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Private files:</label>
                    <select
                      value={storageForm.privateFiles}
                      onChange={(e) => setStorageForm({ ...storageForm, privateFiles: e.target.value })}
                      className="w-full p-2 border border-purple-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                    >
                      <option value="ON">ON (Presigned URL Isolation)</option>
                      <option value="OFF">OFF</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Soft limit:</label>
                    <select
                      value={storageForm.softLimitThreshold}
                      onChange={(e) => setStorageForm({ ...storageForm, softLimitThreshold: e.target.value })}
                      className="w-full p-2 border border-purple-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                    >
                      <option value="80%">Configured (80% Soft Limit)</option>
                      <option value="75%">75% Soft Limit</option>
                      <option value="90%">90% Soft Limit</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2 pt-3">
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl tal-btn-primary font-bold text-xs shadow-md inline-flex items-center gap-1.5"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Simpan</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingCard(null)}
                      className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
                    >
                      Batal
                    </button>
                  </div>
                </form>
              ) : (
                /* Tampilan Data Storage */
                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between py-2 border-b border-[#E9E1F4]">
                    <span className="font-semibold text-[#6F607D]">Free-tier mode</span>
                    <span className="font-bold text-[#261331]">{settings.storage.freeTier}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-[#E9E1F4]">
                    <span className="font-semibold text-[#6F607D]">Private files</span>
                    <span className="font-bold text-[#261331]">{settings.storage.privateFiles}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-[#E9E1F4]">
                    <span className="font-semibold text-[#6F607D]">Soft limit</span>
                    <span className="font-bold text-[#261331]">{settings.storage.softLimitThreshold === '80%' ? 'Configured' : settings.storage.softLimitThreshold}</span>
                  </div>
                </div>
              )}
            </div>

            {editingCard !== 'storage' && (
              <div className="pt-6">
                <button
                  type="button"
                  onClick={() => startEdit('storage')}
                  className="px-6 py-2.5 rounded-xl tal-btn-primary font-bold text-xs shadow-md"
                >
                  Atur kuota
                </button>
              </div>
            )}
          </div>

          {/* Card 4: CV & Verification */}
          <div className="bg-white rounded-[18px] border border-[#E9E1F4] p-6 sm:p-7 shadow-[0_4px_16px_rgba(76,29,149,0.06)] flex flex-col justify-between transition-all">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 text-[#6D28D9] flex items-center justify-center">
                    <FileCheck2 className="w-4 h-4" />
                  </div>
                  <h2 className="text-base font-extrabold text-[#261331]">CV &amp; Verification</h2>
                </div>
                {editingCard === 'cv' && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-[#6D28D9]">
                    Mode Edit
                  </span>
                )}
              </div>

              {editingCard === 'cv' ? (
                /* Formulir Edit CV & Verification */
                <form onSubmit={handleSaveCv} className="space-y-3 text-xs pt-1">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Evidence max (1–8):</label>
                    <input
                      type="number"
                      min={1}
                      max={8}
                      value={cvForm.evidenceMax}
                      onChange={(e) =>
                        setCvForm({ ...cvForm, evidenceMax: Math.min(8, Math.max(1, parseInt(e.target.value) || 8)) })
                      }
                      className="w-full p-2 border border-purple-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">QR verification:</label>
                    <select
                      value={cvForm.qrVerification}
                      onChange={(e) => setCvForm({ ...cvForm, qrVerification: e.target.value })}
                      className="w-full p-2 border border-purple-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                    >
                      <option value="ON">ON (Aktif Otomatis)</option>
                      <option value="OFF">OFF</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Revocation:</label>
                    <select
                      value={cvForm.revocationMode}
                      onChange={(e) => setCvForm({ ...cvForm, revocationMode: e.target.value })}
                      className="w-full p-2 border border-purple-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                    >
                      <option value="Immediate">Immediate (Pencabutan Seketika)</option>
                      <option value="Review">Review (Persetujuan Pimpinan)</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2 pt-3">
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-[#8B5CF6] hover:bg-purple-600 text-white font-bold text-xs shadow-md inline-flex items-center gap-1.5"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Simpan</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingCard(null)}
                      className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
                    >
                      Batal
                    </button>
                  </div>
                </form>
              ) : (
                /* Tampilan Data CV */
                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between py-2 border-b border-[#E9E1F4]">
                    <span className="font-semibold text-[#6F607D]">Evidence max</span>
                    <span className="font-bold text-[#261331]">{settings.cvPolicy.evidenceMax}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-[#E9E1F4]">
                    <span className="font-semibold text-[#6F607D]">QR verification</span>
                    <span className="font-bold text-[#261331]">{settings.cvPolicy.qrVerification}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-[#E9E1F4]">
                    <span className="font-semibold text-[#6F607D]">Revocation</span>
                    <span className="font-bold text-[#261331]">{settings.cvPolicy.revocationMode}</span>
                  </div>
                </div>
              )}
            </div>

            {editingCard !== 'cv' && (
              <div className="pt-6">
                <button
                  type="button"
                  onClick={() => startEdit('cv')}
                  className="px-6 py-2.5 rounded-xl bg-[#8B5CF6] hover:bg-purple-600 text-white font-bold text-xs shadow-md transition-colors"
                >
                  Atur kebijakan
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer info notice */}
        <p className="text-[11px] text-[#6F607D] font-medium pt-2">
          Semua perubahan settings bersifat institusional dan hanya dapat diakses admin sekolah.
        </p>
      </div>
    </AppShell>
  );
}
