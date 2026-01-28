import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { ArrowLeft, Save, Trash2, Edit2, X, Phone, Mail, Building2, User } from 'lucide-react';
export const ContactDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [contact, setContact] = useState(null);
    const [company, setCompany] = useState(null);
    const [companies, setCompanies] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (id) {
            loadContactData(parseInt(id));
        }
    }, [id]);
    const loadContactData = async (contactId) => {
        try {
            const [contactData, allCompanies] = await Promise.all([
                window.api.contacts.getById(contactId),
                window.api.companies.getAll(),
            ]);
            setContact(contactData);
            setEditForm(contactData);
            setCompanies(allCompanies);
            if (contactData.company_id) {
                const companyData = allCompanies.find((c) => c.id === contactData.company_id);
                setCompany(companyData || null);
            }
        }
        catch (error) {
            console.error('Error loading contact:', error);
        }
        finally {
            setLoading(false);
        }
    };
    const handleSave = async () => {
        if (!contact || !id)
            return;
        try {
            await window.api.contacts.update(parseInt(id), editForm);
            setContact({ ...contact, ...editForm });
            setIsEditing(false);
            // Update company reference
            if (editForm.company_id) {
                const newCompany = companies.find(c => c.id === editForm.company_id);
                setCompany(newCompany || null);
            }
            else {
                setCompany(null);
            }
        }
        catch (error) {
            console.error('Error updating contact:', error);
        }
    };
    const handleDelete = async () => {
        if (!id || !confirm('Bu kişiyi silmek istediğinize emin misiniz?'))
            return;
        try {
            await window.api.contacts.delete(parseInt(id));
            navigate('/contacts');
        }
        catch (error) {
            console.error('Error deleting contact:', error);
        }
    };
    if (loading) {
        return (_jsx("div", { className: "flex items-center justify-center h-full", children: _jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" }) }));
    }
    if (!contact) {
        return (_jsxs("div", { className: "text-center py-12", children: [_jsx("p", { className: "text-gray-500", children: "Ki\u015Fi bulunamad\u0131" }), _jsx(Button, { onClick: () => navigate('/contacts'), className: "mt-4", children: "Ki\u015Filere D\u00F6n" })] }));
    }
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsxs(Button, { variant: "ghost", onClick: () => navigate('/contacts'), children: [_jsx(ArrowLeft, { className: "w-4 h-4 mr-2" }), "Geri"] }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "w-16 h-16 rounded-full bg-green-100 flex items-center justify-center", children: _jsx(User, { className: "w-8 h-8 text-green-600" }) }), _jsxs("div", { children: [_jsxs("h1", { className: "text-2xl font-bold", children: [contact.first_name, " ", contact.last_name] }), _jsx("p", { className: "text-gray-500", children: contact.title || 'Pozisyon belirtilmemiş' })] })] })] }), _jsx("div", { className: "flex gap-2", children: isEditing ? (_jsxs(_Fragment, { children: [_jsxs(Button, { variant: "outline", onClick: () => setIsEditing(false), children: [_jsx(X, { className: "w-4 h-4 mr-2" }), "\u0130ptal"] }), _jsxs(Button, { onClick: handleSave, children: [_jsx(Save, { className: "w-4 h-4 mr-2" }), "Kaydet"] })] })) : (_jsxs(_Fragment, { children: [_jsxs(Button, { variant: "outline", onClick: () => setIsEditing(true), children: [_jsx(Edit2, { className: "w-4 h-4 mr-2" }), "D\u00FCzenle"] }), _jsxs(Button, { variant: "destructive", onClick: handleDelete, children: [_jsx(Trash2, { className: "w-4 h-4 mr-2" }), "Sil"] })] })) })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsx("div", { className: "lg:col-span-2", children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Ki\u015Fi Bilgileri" }) }), _jsx(CardContent, { children: isEditing ? (_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx(Label, { children: "Ad" }), _jsx(Input, { value: editForm.first_name || '', onChange: (e) => setEditForm({ ...editForm, first_name: e.target.value }) })] }), _jsxs("div", { children: [_jsx(Label, { children: "Soyad" }), _jsx(Input, { value: editForm.last_name || '', onChange: (e) => setEditForm({ ...editForm, last_name: e.target.value }) })] }), _jsxs("div", { children: [_jsx(Label, { children: "Pozisyon" }), _jsx(Input, { value: editForm.title || '', onChange: (e) => setEditForm({ ...editForm, title: e.target.value }) })] }), _jsxs("div", { children: [_jsx(Label, { children: "Firma" }), _jsxs("select", { className: "w-full h-10 px-3 rounded-md border border-input bg-background", value: editForm.company_id || '', onChange: (e) => setEditForm({ ...editForm, company_id: e.target.value ? parseInt(e.target.value) : undefined }), children: [_jsx("option", { value: "", children: "Firma Se\u00E7in" }), companies.map((c) => (_jsx("option", { value: c.id, children: c.name }, c.id)))] })] }), _jsxs("div", { children: [_jsx(Label, { children: "E-posta" }), _jsx(Input, { type: "email", value: editForm.email || '', onChange: (e) => setEditForm({ ...editForm, email: e.target.value }) })] }), _jsxs("div", { children: [_jsx(Label, { children: "Telefon" }), _jsx(Input, { value: editForm.phone || '', onChange: (e) => setEditForm({ ...editForm, phone: e.target.value }) })] }), _jsxs("div", { children: [_jsx(Label, { children: "Mobil" }), _jsx(Input, { value: editForm.mobile || '', onChange: (e) => setEditForm({ ...editForm, mobile: e.target.value }) })] }), _jsxs("div", { className: "col-span-2", children: [_jsx(Label, { children: "Notlar" }), _jsx(Textarea, { value: editForm.notes || '', onChange: (e) => setEditForm({ ...editForm, notes: e.target.value }) })] })] })) : (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [contact.email && (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Mail, { className: "w-4 h-4 text-gray-400" }), _jsx("a", { href: `mailto:${contact.email}`, className: "text-blue-600 hover:underline", children: contact.email })] })), contact.phone && (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Phone, { className: "w-4 h-4 text-gray-400" }), _jsx("span", { children: contact.phone })] })), contact.mobile && (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Phone, { className: "w-4 h-4 text-gray-400" }), _jsxs("span", { children: [contact.mobile, " (Mobil)"] })] }))] }), contact.notes && (_jsx("div", { className: "pt-4 border-t", children: _jsx("p", { className: "text-sm text-gray-600", children: contact.notes }) }))] })) })] }) }), _jsxs("div", { className: "space-y-6", children: [_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Building2, { className: "w-5 h-5" }), "Firma"] }) }), _jsx(CardContent, { children: company ? (_jsxs("div", { className: "flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer", onClick: () => navigate(`/companies/${company.id}`), children: [_jsx("div", { className: "w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center", children: _jsx(Building2, { className: "w-5 h-5 text-blue-600" }) }), _jsx("span", { className: "font-medium", children: company.name })] })) : (_jsx("p", { className: "text-gray-500 text-center py-4", children: "Firmaya ba\u011Fl\u0131 de\u011Fil" })) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Bilgi" }) }), _jsx(CardContent, { className: "space-y-4", children: _jsxs("div", { children: [_jsx("p", { className: "text-sm text-gray-500", children: "Kay\u0131t Tarihi" }), _jsx("p", { className: "font-medium", children: new Date(contact.created_at).toLocaleDateString('tr-TR') })] }) })] })] })] })] }));
};
