import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Database, FolderOpen, Download, Upload, Trash2, Info } from 'lucide-react';
export const Settings = () => {
    const [dbPath, setDbPath] = useState('');
    const [docPath, setDocPath] = useState('');
    const handleExportData = async () => {
        try {
            const [companies, contacts, projects, activities] = await Promise.all([
                window.api.companies.getAll(),
                window.api.contacts.getAll(),
                window.api.projects.getAll(),
                window.api.activities.getAll(),
            ]);
            const exportData = {
                exportDate: new Date().toISOString(),
                companies,
                contacts,
                projects,
                activities,
            };
            const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `firmascope-export-${new Date().toISOString().split('T')[0]}.json`;
            a.click();
            URL.revokeObjectURL(url);
        }
        catch (error) {
            console.error('Export error:', error);
            alert('Dışa aktarma sırasında hata oluştu');
        }
    };
    const handleClearData = async () => {
        if (!confirm('TÜM VERİLERİ SİLMEK İSTEDİĞİNİZE EMİN MİSİNİZ?\n\nBu işlem geri alınamaz!'))
            return;
        if (!confirm('Son uyarı: Tüm firmalar, kişiler, projeler ve aktiviteler silinecek. Devam?'))
            return;
        // This would need a proper implementation in the main process
        alert('Bu özellik henüz implementlenmedi.');
    };
    return (_jsxs("div", { className: "space-y-6 max-w-3xl", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold", children: "Ayarlar" }), _jsx("p", { className: "text-gray-500", children: "Uygulama ayarlar\u0131n\u0131 y\u00F6netin" })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Info, { className: "w-5 h-5" }), "Uygulama Bilgisi"] }) }), _jsx(CardContent, { className: "space-y-4", children: _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-500", children: "Uygulama" }), _jsx("p", { className: "font-medium", children: "FirmaScope" })] }), _jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-500", children: "Versiyon" }), _jsx("p", { className: "font-medium", children: "1.0.0" })] }), _jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-500", children: "Geli\u015Ftirici" }), _jsx("p", { className: "font-medium", children: "FirmaScope Team" })] }), _jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-500", children: "Platform" }), _jsx("p", { className: "font-medium", children: "Electron + React" })] })] }) })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Database, { className: "w-5 h-5" }), "Veritaban\u0131"] }), _jsx(CardDescription, { children: "Veritaban\u0131 ayarlar\u0131 ve yedekleme" })] }), _jsx(CardContent, { className: "space-y-4", children: _jsxs("div", { children: [_jsx(Label, { children: "Veritaban\u0131 Konumu" }), _jsxs("div", { className: "flex gap-2 mt-1", children: [_jsx(Input, { value: dbPath || 'Varsayılan konum kullanılıyor', disabled: true, className: "bg-gray-50" }), _jsx(Button, { variant: "outline", disabled: true, children: _jsx(FolderOpen, { className: "w-4 h-4" }) })] }), _jsx("p", { className: "text-xs text-gray-500 mt-1", children: "SQLite veritaban\u0131 dosya konumu" })] }) })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(FolderOpen, { className: "w-5 h-5" }), "Dosya Depolama"] }), _jsx(CardDescription, { children: "D\u00F6k\u00FCmanlar\u0131n saklanaca\u011F\u0131 konum" })] }), _jsx(CardContent, { className: "space-y-4", children: _jsxs("div", { children: [_jsx(Label, { children: "D\u00F6k\u00FCman Klas\u00F6r\u00FC" }), _jsxs("div", { className: "flex gap-2 mt-1", children: [_jsx(Input, { value: docPath || 'Varsayılan konum kullanılıyor', disabled: true, className: "bg-gray-50" }), _jsx(Button, { variant: "outline", disabled: true, children: _jsx(FolderOpen, { className: "w-4 h-4" }) })] })] }) })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Veri Y\u00F6netimi" }), _jsx(CardDescription, { children: "Verilerinizi d\u0131\u015Fa aktar\u0131n veya i\u00E7e aktar\u0131n" })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "flex gap-4", children: [_jsxs(Button, { variant: "outline", onClick: handleExportData, children: [_jsx(Download, { className: "w-4 h-4 mr-2" }), "Verileri D\u0131\u015Fa Aktar (JSON)"] }), _jsxs(Button, { variant: "outline", disabled: true, children: [_jsx(Upload, { className: "w-4 h-4 mr-2" }), "Verileri \u0130\u00E7e Aktar"] })] }), _jsxs("div", { className: "pt-4 border-t", children: [_jsxs(Button, { variant: "destructive", onClick: handleClearData, children: [_jsx(Trash2, { className: "w-4 h-4 mr-2" }), "T\u00FCm Verileri Sil"] }), _jsx("p", { className: "text-xs text-gray-500 mt-2", children: "Dikkat: Bu i\u015Flem geri al\u0131namaz!" })] })] })] })] }));
};
