import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Plus, FolderOpen, Building2, Calendar, Trash2 } from 'lucide-react';
export const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('all');
    const [newProject, setNewProject] = useState({
        name: '',
        description: '',
        status: 'active',
        company_id: '',
        start_date: '',
        end_date: '',
    });
    useEffect(() => {
        loadData();
    }, []);
    const loadData = async () => {
        try {
            const [projectsData, companiesData] = await Promise.all([
                window.api.projects.getAll(),
                window.api.companies.getAll(),
            ]);
            setProjects(projectsData);
            setCompanies(companiesData);
        }
        catch (error) {
            console.error('Error loading projects:', error);
        }
        finally {
            setLoading(false);
        }
    };
    const handleCreate = async () => {
        if (!newProject.name.trim())
            return;
        try {
            await window.api.projects.create({
                ...newProject,
                company_id: newProject.company_id ? parseInt(newProject.company_id) : null,
            });
            setIsDialogOpen(false);
            setNewProject({
                name: '',
                description: '',
                status: 'active',
                company_id: '',
                start_date: '',
                end_date: '',
            });
            loadData();
        }
        catch (error) {
            console.error('Error creating project:', error);
        }
    };
    const handleDelete = async (id) => {
        if (!confirm('Bu projeyi silmek istediğinize emin misiniz?'))
            return;
        try {
            await window.api.projects.delete(id);
            loadData();
        }
        catch (error) {
            console.error('Error deleting project:', error);
        }
    };
    const handleStatusChange = async (id, status) => {
        try {
            await window.api.projects.update(id, { status });
            loadData();
        }
        catch (error) {
            console.error('Error updating project:', error);
        }
    };
    const getCompanyName = (companyId) => {
        if (!companyId)
            return null;
        const company = companies.find(c => c.id === companyId);
        return company?.name;
    };
    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-700';
            case 'completed': return 'bg-blue-100 text-blue-700';
            case 'on_hold': return 'bg-yellow-100 text-yellow-700';
            case 'cancelled': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };
    const getStatusLabel = (status) => {
        switch (status) {
            case 'active': return 'Aktif';
            case 'completed': return 'Tamamlandı';
            case 'on_hold': return 'Beklemede';
            case 'cancelled': return 'İptal';
            default: return status;
        }
    };
    const filteredProjects = statusFilter === 'all'
        ? projects
        : projects.filter(p => p.status === statusFilter);
    if (loading) {
        return (_jsx("div", { className: "flex items-center justify-center h-full", children: _jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" }) }));
    }
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold", children: "Projeler" }), _jsx("p", { className: "text-gray-500", children: "T\u00FCm projelerinizi y\u00F6netin" })] }), _jsxs(Dialog, { open: isDialogOpen, onOpenChange: setIsDialogOpen, children: [_jsx(DialogTrigger, { asChild: true, children: _jsxs(Button, { children: [_jsx(Plus, { className: "w-4 h-4 mr-2" }), "Yeni Proje"] }) }), _jsxs(DialogContent, { children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: "Yeni Proje Ekle" }) }), _jsxs("div", { className: "space-y-4 pt-4", children: [_jsxs("div", { children: [_jsx(Label, { children: "Proje Ad\u0131 *" }), _jsx(Input, { value: newProject.name, onChange: (e) => setNewProject({ ...newProject, name: e.target.value }), placeholder: "Proje ad\u0131" })] }), _jsxs("div", { children: [_jsx(Label, { children: "Firma" }), _jsxs("select", { className: "w-full h-10 px-3 rounded-md border border-input bg-background", value: newProject.company_id, onChange: (e) => setNewProject({ ...newProject, company_id: e.target.value }), children: [_jsx("option", { value: "", children: "Firma Se\u00E7in (Opsiyonel)" }), companies.map((c) => (_jsx("option", { value: c.id, children: c.name }, c.id)))] })] }), _jsxs("div", { children: [_jsx(Label, { children: "Durum" }), _jsxs("select", { className: "w-full h-10 px-3 rounded-md border border-input bg-background", value: newProject.status, onChange: (e) => setNewProject({ ...newProject, status: e.target.value }), children: [_jsx("option", { value: "active", children: "Aktif" }), _jsx("option", { value: "on_hold", children: "Beklemede" }), _jsx("option", { value: "completed", children: "Tamamland\u0131" }), _jsx("option", { value: "cancelled", children: "\u0130ptal" })] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx(Label, { children: "Ba\u015Flang\u0131\u00E7 Tarihi" }), _jsx(Input, { type: "date", value: newProject.start_date, onChange: (e) => setNewProject({ ...newProject, start_date: e.target.value }) })] }), _jsxs("div", { children: [_jsx(Label, { children: "Biti\u015F Tarihi" }), _jsx(Input, { type: "date", value: newProject.end_date, onChange: (e) => setNewProject({ ...newProject, end_date: e.target.value }) })] })] }), _jsxs("div", { children: [_jsx(Label, { children: "A\u00E7\u0131klama" }), _jsx(Textarea, { value: newProject.description, onChange: (e) => setNewProject({ ...newProject, description: e.target.value }), placeholder: "Proje a\u00E7\u0131klamas\u0131..." })] }), _jsx(Button, { onClick: handleCreate, className: "w-full", children: "Proje Ekle" })] })] })] })] }), _jsxs("div", { className: "flex gap-2", children: [_jsxs(Button, { variant: statusFilter === 'all' ? 'default' : 'outline', size: "sm", onClick: () => setStatusFilter('all'), children: ["T\u00FCm\u00FC (", projects.length, ")"] }), _jsxs(Button, { variant: statusFilter === 'active' ? 'default' : 'outline', size: "sm", onClick: () => setStatusFilter('active'), children: ["Aktif (", projects.filter(p => p.status === 'active').length, ")"] }), _jsxs(Button, { variant: statusFilter === 'on_hold' ? 'default' : 'outline', size: "sm", onClick: () => setStatusFilter('on_hold'), children: ["Beklemede (", projects.filter(p => p.status === 'on_hold').length, ")"] }), _jsxs(Button, { variant: statusFilter === 'completed' ? 'default' : 'outline', size: "sm", onClick: () => setStatusFilter('completed'), children: ["Tamamland\u0131 (", projects.filter(p => p.status === 'completed').length, ")"] })] }), filteredProjects.length === 0 ? (_jsx(Card, { children: _jsxs(CardContent, { className: "py-12 text-center", children: [_jsx(FolderOpen, { className: "w-12 h-12 text-gray-300 mx-auto mb-4" }), _jsx("p", { className: "text-gray-500", children: "Hen\u00FCz proje yok" }), _jsx(Button, { className: "mt-4", onClick: () => setIsDialogOpen(true), children: "\u0130lk Projeyi Ekle" })] }) })) : (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: filteredProjects.map((project) => (_jsxs(Card, { className: "hover:shadow-lg transition-shadow", children: [_jsx(CardHeader, { className: "pb-2", children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center", children: _jsx(FolderOpen, { className: "w-5 h-5 text-purple-600" }) }), _jsxs("div", { children: [_jsx(CardTitle, { className: "text-lg", children: project.name }), getCompanyName(project.company_id) && (_jsxs("p", { className: "text-sm text-gray-500 flex items-center gap-1", children: [_jsx(Building2, { className: "w-3 h-3" }), getCompanyName(project.company_id)] }))] })] }), _jsx(Button, { variant: "ghost", size: "sm", onClick: () => handleDelete(project.id), children: _jsx(Trash2, { className: "w-4 h-4 text-gray-400 hover:text-red-500" }) })] }) }), _jsxs(CardContent, { children: [project.description && (_jsx("p", { className: "text-sm text-gray-600 mb-3 line-clamp-2", children: project.description })), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("select", { className: `text-xs px-2 py-1 rounded-full border-0 ${getStatusColor(project.status)}`, value: project.status, onChange: (e) => handleStatusChange(project.id, e.target.value), children: [_jsx("option", { value: "active", children: "Aktif" }), _jsx("option", { value: "on_hold", children: "Beklemede" }), _jsx("option", { value: "completed", children: "Tamamland\u0131" }), _jsx("option", { value: "cancelled", children: "\u0130ptal" })] }), project.start_date && (_jsxs("span", { className: "text-xs text-gray-500 flex items-center gap-1", children: [_jsx(Calendar, { className: "w-3 h-3" }), new Date(project.start_date).toLocaleDateString('tr-TR')] }))] })] })] }, project.id))) }))] }));
};
