import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { ArrowLeft, Save, Trash2, Users, FileText, Edit2, X, Phone, Mail, Globe, MapPin } from 'lucide-react';
export const CompanyDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [company, setCompany] = useState(null);
    const [contacts, setContacts] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (id) {
            loadCompanyData(parseInt(id));
        }
    }, [id]);
    const loadCompanyData = async (companyId) => {
        try {
            const [companyData, allContacts, allDocuments] = await Promise.all([
                window.api.companies.getById(companyId),
                window.api.contacts.getAll(),
                window.api.documents.getAll(),
            ]);
            setCompany(companyData);
            setEditForm(companyData);
            // Filter contacts for this company
            setContacts(allContacts.filter((c) => c.company_id === companyId));
            // Filter documents for this company
            setDocuments(allDocuments.filter((d) => d.company_id === companyId));
        }
        catch (error) {
            console.error('Error loading company:', error);
        }
        finally {
            setLoading(false);
        }
    };
    const handleSave = async () => {
        if (!company || !id)
            return;
        try {
            await window.api.companies.update(parseInt(id), editForm);
            setCompany({ ...company, ...editForm });
            setIsEditing(false);
        }
        catch (error) {
            console.error('Error updating company:', error);
        }
    };
    const handleDelete = async () => {
        if (!id || !confirm('Bu firmayı silmek istediğinize emin misiniz?'))
            return;
        try {
            await window.api.companies.delete(parseInt(id));
            navigate('/companies');
        }
        catch (error) {
            console.error('Error deleting company:', error);
        }
    };
    if (loading) {
        return (_jsx("div", { className: "flex items-center justify-center h-full", children: _jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" }) }));
    }
    if (!company) {
        return (_jsxs("div", { className: "text-center py-12", children: [_jsx("p", { className: "text-gray-500", children: "Firma bulunamad\u0131" }), _jsx(Button, { onClick: () => navigate('/companies'), className: "mt-4", children: "Firmalara D\u00F6n" })] }));
    }
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsxs(Button, { variant: "ghost", onClick: () => navigate('/companies'), children: [_jsx(ArrowLeft, { className: "w-4 h-4 mr-2" }), "Geri"] }), _jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold", children: company.name }), _jsx("p", { className: "text-gray-500", children: company.sector || 'Sektör belirtilmemiş' })] })] }), _jsx("div", { className: "flex gap-2", children: isEditing ? (_jsxs(_Fragment, { children: [_jsxs(Button, { variant: "outline", onClick: () => setIsEditing(false), children: [_jsx(X, { className: "w-4 h-4 mr-2" }), "\u0130ptal"] }), _jsxs(Button, { onClick: handleSave, children: [_jsx(Save, { className: "w-4 h-4 mr-2" }), "Kaydet"] })] })) : (_jsxs(_Fragment, { children: [_jsxs(Button, { variant: "outline", onClick: () => setIsEditing(true), children: [_jsx(Edit2, { className: "w-4 h-4 mr-2" }), "D\u00FCzenle"] }), _jsxs(Button, { variant: "destructive", onClick: handleDelete, children: [_jsx(Trash2, { className: "w-4 h-4 mr-2" }), "Sil"] })] })) })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsxs("div", { className: "lg:col-span-2 space-y-6", children: [_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Firma Bilgileri" }) }), _jsx(CardContent, { children: isEditing ? (_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "col-span-2", children: [_jsx(Label, { children: "Firma Ad\u0131" }), _jsx(Input, { value: editForm.name || '', onChange: (e) => setEditForm({ ...editForm, name: e.target.value }) })] }), _jsxs("div", { children: [_jsx(Label, { children: "Vergi No" }), _jsx(Input, { value: editForm.tax_number || '', onChange: (e) => setEditForm({ ...editForm, tax_number: e.target.value }) })] }), _jsxs("div", { children: [_jsx(Label, { children: "Vergi Dairesi" }), _jsx(Input, { value: editForm.tax_office || '', onChange: (e) => setEditForm({ ...editForm, tax_office: e.target.value }) })] }), _jsxs("div", { children: [_jsx(Label, { children: "Telefon" }), _jsx(Input, { value: editForm.phone || '', onChange: (e) => setEditForm({ ...editForm, phone: e.target.value }) })] }), _jsxs("div", { children: [_jsx(Label, { children: "E-posta" }), _jsx(Input, { value: editForm.email || '', onChange: (e) => setEditForm({ ...editForm, email: e.target.value }) })] }), _jsxs("div", { children: [_jsx(Label, { children: "Website" }), _jsx(Input, { value: editForm.website || '', onChange: (e) => setEditForm({ ...editForm, website: e.target.value }) })] }), _jsxs("div", { children: [_jsx(Label, { children: "Sekt\u00F6r" }), _jsx(Input, { value: editForm.sector || '', onChange: (e) => setEditForm({ ...editForm, sector: e.target.value }) })] }), _jsxs("div", { className: "col-span-2", children: [_jsx(Label, { children: "Adres" }), _jsx(Textarea, { value: editForm.address || '', onChange: (e) => setEditForm({ ...editForm, address: e.target.value }) })] }), _jsxs("div", { className: "col-span-2", children: [_jsx(Label, { children: "Notlar" }), _jsx(Textarea, { value: editForm.notes || '', onChange: (e) => setEditForm({ ...editForm, notes: e.target.value }) })] })] })) : (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [company.phone && (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Phone, { className: "w-4 h-4 text-gray-400" }), _jsx("span", { children: company.phone })] })), company.email && (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Mail, { className: "w-4 h-4 text-gray-400" }), _jsx("span", { children: company.email })] })), company.website && (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Globe, { className: "w-4 h-4 text-gray-400" }), _jsx("a", { href: company.website, target: "_blank", className: "text-blue-600 hover:underline", children: company.website })] })), company.address && (_jsxs("div", { className: "flex items-center gap-2 col-span-2", children: [_jsx(MapPin, { className: "w-4 h-4 text-gray-400" }), _jsx("span", { children: company.address })] }))] }), company.notes && (_jsx("div", { className: "pt-4 border-t", children: _jsx("p", { className: "text-sm text-gray-600", children: company.notes }) }))] })) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { className: "flex flex-row items-center justify-between", children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Users, { className: "w-5 h-5" }), "\u0130li\u015Fkili Ki\u015Filer (", contacts.length, ")"] }) }), _jsx(CardContent, { children: contacts.length === 0 ? (_jsx("p", { className: "text-gray-500 text-center py-4", children: "Bu firmaya ait ki\u015Fi yok" })) : (_jsx("div", { className: "space-y-2", children: contacts.map((contact) => (_jsxs("div", { className: "flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer", onClick: () => navigate(`/contacts/${contact.id}`), children: [_jsxs("div", { children: [_jsxs("p", { className: "font-medium", children: [contact.first_name, " ", contact.last_name] }), _jsx("p", { className: "text-sm text-gray-500", children: contact.title })] }), _jsx("div", { className: "text-sm text-gray-500", children: contact.email || contact.phone })] }, contact.id))) })) })] })] }), _jsxs("div", { className: "space-y-6", children: [_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "\u00D6zet" }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-500", children: "Vergi No" }), _jsx("p", { className: "font-medium", children: company.tax_number || '-' })] }), _jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-500", children: "Vergi Dairesi" }), _jsx("p", { className: "font-medium", children: company.tax_office || '-' })] }), _jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-500", children: "Kay\u0131t Tarihi" }), _jsx("p", { className: "font-medium", children: new Date(company.created_at).toLocaleDateString('tr-TR') })] })] })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(FileText, { className: "w-5 h-5" }), "D\u00F6k\u00FCmanlar (", documents.length, ")"] }) }), _jsx(CardContent, { children: documents.length === 0 ? (_jsx("p", { className: "text-gray-500 text-center py-4", children: "D\u00F6k\u00FCman yok" })) : (_jsx("div", { className: "space-y-2", children: documents.map((doc) => (_jsxs("div", { className: "flex items-center gap-2 p-2 rounded hover:bg-gray-50", children: [_jsx(FileText, { className: "w-4 h-4 text-gray-400" }), _jsx("span", { className: "text-sm truncate", children: doc.name })] }, doc.id))) })) })] })] })] })] }));
};
