import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Plus, Phone, Mail, Users, FileText, Calendar, Building2, User } from 'lucide-react';
export const Activities = () => {
    const [activities, setActivities] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [newActivity, setNewActivity] = useState({
        type: 'note',
        subject: '',
        notes: '',
        activity_date: new Date().toISOString().split('T')[0],
        company_id: '',
        contact_id: '',
    });
    useEffect(() => {
        loadData();
    }, []);
    const loadData = async () => {
        try {
            const [activitiesData, companiesData, contactsData] = await Promise.all([
                window.api.activities.getAll(),
                window.api.companies.getAll(),
                window.api.contacts.getAll(),
            ]);
            setActivities(activitiesData.sort((a, b) => new Date(b.activity_date).getTime() - new Date(a.activity_date).getTime()));
            setCompanies(companiesData);
            setContacts(contactsData);
        }
        catch (error) {
            console.error('Error loading activities:', error);
        }
        finally {
            setLoading(false);
        }
    };
    const handleCreate = async () => {
        if (!newActivity.subject.trim())
            return;
        try {
            await window.api.activities.create({
                ...newActivity,
                company_id: newActivity.company_id ? parseInt(newActivity.company_id) : null,
                contact_id: newActivity.contact_id ? parseInt(newActivity.contact_id) : null,
            });
            setIsDialogOpen(false);
            setNewActivity({
                type: 'note',
                subject: '',
                notes: '',
                activity_date: new Date().toISOString().split('T')[0],
                company_id: '',
                contact_id: '',
            });
            loadData();
        }
        catch (error) {
            console.error('Error creating activity:', error);
        }
    };
    const getActivityIcon = (type) => {
        switch (type) {
            case 'meeting': return _jsx(Users, { className: "w-5 h-5" });
            case 'call': return _jsx(Phone, { className: "w-5 h-5" });
            case 'email': return _jsx(Mail, { className: "w-5 h-5" });
            case 'note': return _jsx(FileText, { className: "w-5 h-5" });
            default: return _jsx(Calendar, { className: "w-5 h-5" });
        }
    };
    const getActivityColor = (type) => {
        switch (type) {
            case 'meeting': return 'bg-purple-100 text-purple-600 border-purple-200';
            case 'call': return 'bg-green-100 text-green-600 border-green-200';
            case 'email': return 'bg-blue-100 text-blue-600 border-blue-200';
            case 'note': return 'bg-yellow-100 text-yellow-600 border-yellow-200';
            default: return 'bg-gray-100 text-gray-600 border-gray-200';
        }
    };
    const getActivityLabel = (type) => {
        switch (type) {
            case 'meeting': return 'Toplantı';
            case 'call': return 'Arama';
            case 'email': return 'E-posta';
            case 'note': return 'Not';
            default: return type;
        }
    };
    const getCompanyName = (companyId) => {
        if (!companyId)
            return null;
        const company = companies.find(c => c.id === companyId);
        return company?.name;
    };
    const getContactName = (contactId) => {
        if (!contactId)
            return null;
        const contact = contacts.find(c => c.id === contactId);
        return contact ? `${contact.first_name} ${contact.last_name}` : null;
    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('tr-TR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };
    const filteredActivities = filter === 'all'
        ? activities
        : activities.filter(a => a.type === filter);
    // Group activities by date
    const groupedActivities = filteredActivities.reduce((groups, activity) => {
        const date = activity.activity_date.split('T')[0];
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(activity);
        return groups;
    }, {});
    if (loading) {
        return (_jsx("div", { className: "flex items-center justify-center h-full", children: _jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" }) }));
    }
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold", children: "Aktiviteler" }), _jsx("p", { className: "text-gray-500", children: "T\u00FCm aktivitelerin zaman \u00E7izelgesi" })] }), _jsxs(Dialog, { open: isDialogOpen, onOpenChange: setIsDialogOpen, children: [_jsx(DialogTrigger, { asChild: true, children: _jsxs(Button, { children: [_jsx(Plus, { className: "w-4 h-4 mr-2" }), "Yeni Aktivite"] }) }), _jsxs(DialogContent, { children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: "Yeni Aktivite Ekle" }) }), _jsxs("div", { className: "space-y-4 pt-4", children: [_jsxs("div", { children: [_jsx(Label, { children: "Tip" }), _jsxs("select", { className: "w-full h-10 px-3 rounded-md border border-input bg-background", value: newActivity.type, onChange: (e) => setNewActivity({ ...newActivity, type: e.target.value }), children: [_jsx("option", { value: "note", children: "Not" }), _jsx("option", { value: "call", children: "Arama" }), _jsx("option", { value: "email", children: "E-posta" }), _jsx("option", { value: "meeting", children: "Toplant\u0131" })] })] }), _jsxs("div", { children: [_jsx(Label, { children: "Konu *" }), _jsx(Input, { value: newActivity.subject, onChange: (e) => setNewActivity({ ...newActivity, subject: e.target.value }), placeholder: "Aktivite konusu" })] }), _jsxs("div", { children: [_jsx(Label, { children: "Tarih" }), _jsx(Input, { type: "date", value: newActivity.activity_date, onChange: (e) => setNewActivity({ ...newActivity, activity_date: e.target.value }) })] }), _jsxs("div", { children: [_jsx(Label, { children: "Firma" }), _jsxs("select", { className: "w-full h-10 px-3 rounded-md border border-input bg-background", value: newActivity.company_id, onChange: (e) => setNewActivity({ ...newActivity, company_id: e.target.value }), children: [_jsx("option", { value: "", children: "Firma Se\u00E7in (Opsiyonel)" }), companies.map((c) => (_jsx("option", { value: c.id, children: c.name }, c.id)))] })] }), _jsxs("div", { children: [_jsx(Label, { children: "Ki\u015Fi" }), _jsxs("select", { className: "w-full h-10 px-3 rounded-md border border-input bg-background", value: newActivity.contact_id, onChange: (e) => setNewActivity({ ...newActivity, contact_id: e.target.value }), children: [_jsx("option", { value: "", children: "Ki\u015Fi Se\u00E7in (Opsiyonel)" }), contacts.map((c) => (_jsxs("option", { value: c.id, children: [c.first_name, " ", c.last_name] }, c.id)))] })] }), _jsxs("div", { children: [_jsx(Label, { children: "Notlar" }), _jsx(Textarea, { value: newActivity.notes, onChange: (e) => setNewActivity({ ...newActivity, notes: e.target.value }), placeholder: "Detayl\u0131 notlar..." })] }), _jsx(Button, { onClick: handleCreate, className: "w-full", children: "Aktivite Ekle" })] })] })] })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { variant: filter === 'all' ? 'default' : 'outline', size: "sm", onClick: () => setFilter('all'), children: "T\u00FCm\u00FC" }), _jsx(Button, { variant: filter === 'meeting' ? 'default' : 'outline', size: "sm", onClick: () => setFilter('meeting'), children: "Toplant\u0131lar" }), _jsx(Button, { variant: filter === 'call' ? 'default' : 'outline', size: "sm", onClick: () => setFilter('call'), children: "Aramalar" }), _jsx(Button, { variant: filter === 'email' ? 'default' : 'outline', size: "sm", onClick: () => setFilter('email'), children: "E-postalar" }), _jsx(Button, { variant: filter === 'note' ? 'default' : 'outline', size: "sm", onClick: () => setFilter('note'), children: "Notlar" })] }), Object.keys(groupedActivities).length === 0 ? (_jsx(Card, { children: _jsxs(CardContent, { className: "py-12 text-center", children: [_jsx(Calendar, { className: "w-12 h-12 text-gray-300 mx-auto mb-4" }), _jsx("p", { className: "text-gray-500", children: "Hen\u00FCz aktivite yok" }), _jsx(Button, { className: "mt-4", onClick: () => setIsDialogOpen(true), children: "\u0130lk Aktiviteyi Ekle" })] }) })) : (_jsx("div", { className: "space-y-6", children: Object.entries(groupedActivities).map(([date, dayActivities]) => (_jsxs("div", { children: [_jsx("h3", { className: "text-sm font-medium text-gray-500 mb-3", children: formatDate(date) }), _jsx("div", { className: "space-y-3", children: dayActivities.map((activity) => (_jsx(Card, { className: "overflow-hidden", children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex gap-4", children: [_jsx("div", { className: `w-10 h-10 rounded-full flex items-center justify-center ${getActivityColor(activity.type)}`, children: getActivityIcon(activity.type) }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("span", { className: `text-xs px-2 py-0.5 rounded-full ${getActivityColor(activity.type)}`, children: getActivityLabel(activity.type) }), getCompanyName(activity.company_id) && (_jsxs("span", { className: "text-xs text-gray-500 flex items-center gap-1", children: [_jsx(Building2, { className: "w-3 h-3" }), getCompanyName(activity.company_id)] })), getContactName(activity.contact_id) && (_jsxs("span", { className: "text-xs text-gray-500 flex items-center gap-1", children: [_jsx(User, { className: "w-3 h-3" }), getContactName(activity.contact_id)] }))] }), _jsx("h4", { className: "font-medium", children: activity.subject }), activity.notes && (_jsx("p", { className: "text-sm text-gray-600 mt-1", children: activity.notes }))] })] }) }) }, activity.id))) })] }, date))) }))] }));
};
