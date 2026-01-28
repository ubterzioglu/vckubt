import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
export const Dashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        companiesCount: 0,
        contactsCount: 0,
        projectsCount: 0,
        documentsCount: 0,
    });
    const [recentActivities, setRecentActivities] = useState([]);
    const [recentCompanies, setRecentCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        loadDashboardData();
    }, []);
    const loadDashboardData = async () => {
        try {
            // Load counts
            const [companies, contacts, projects, documents, activities] = await Promise.all([
                window.api.companies.getAll(),
                window.api.contacts.getAll(),
                window.api.projects.getAll(),
                window.api.documents.getAll(),
                window.api.activities.getAll(),
            ]);
            setStats({
                companiesCount: companies.length,
                contactsCount: contacts.length,
                projectsCount: projects.length,
                documentsCount: documents.length,
            });
            // Get recent activities (last 5)
            const sortedActivities = activities
                .sort((a, b) => new Date(b.activity_date).getTime() - new Date(a.activity_date).getTime())
                .slice(0, 5);
            setRecentActivities(sortedActivities);
            // Get recent companies (last 5)
            const sortedCompanies = companies
                .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                .slice(0, 5);
            setRecentCompanies(sortedCompanies);
        }
        catch (error) {
            console.error('Dashboard data load error:', error);
        }
        finally {
            setLoading(false);
        }
    };
    const statCards = [
        { title: 'Firmalar', value: stats.companiesCount, icon: Building2, color: 'text-blue-600', bg: 'bg-blue-100', path: '/companies' },
        { title: 'Kişiler', value: stats.contactsCount, icon: Users, color: 'text-green-600', bg: 'bg-green-100', path: '/contacts' },
        { title: 'Projeler', value: stats.projectsCount, icon: FolderOpen, color: 'text-purple-600', bg: 'bg-purple-100', path: '/projects' },
        { title: 'Dökümanlar', value: stats.documentsCount, icon: FileText, color: 'text-orange-600', bg: 'bg-orange-100', path: '/documents' },
    ];
    const getActivityIcon = (type) => {
        switch (type) {
            case 'meeting': return '🤝';
            case 'call': return '📞';
            case 'email': return '📧';
            case 'note': return '📝';
            default: return '📌';
        }
    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
        if (diffDays === 0)
            return 'Bugün';
        if (diffDays === 1)
            return 'Dün';
        if (diffDays < 7)
            return `${diffDays} gün önce`;
        return date.toLocaleDateString('tr-TR');
    };
    if (loading) {
        return (_jsx("div", { className: "flex items-center justify-center h-full", children: _jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" }) }));
    }
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "Dashboard" }), _jsx("p", { className: "text-gray-500 mt-1", children: "FirmaScope'a ho\u015F geldiniz" })] }), _jsxs("div", { className: "flex gap-2", children: [_jsxs(Button, { onClick: () => navigate('/companies'), variant: "outline", children: [_jsx(Plus, { className: "w-4 h-4 mr-2" }), "Yeni Firma"] }), _jsxs(Button, { onClick: () => navigate('/contacts'), children: [_jsx(Plus, { className: "w-4 h-4 mr-2" }), "Yeni Ki\u015Fi"] })] })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", children: statCards.map((stat) => (_jsx(Card, { className: "cursor-pointer hover:shadow-lg transition-shadow", onClick: () => navigate(stat.path), children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-gray-500", children: stat.title }), _jsx("p", { className: "text-3xl font-bold mt-1", children: stat.value })] }), _jsx("div", { className: `p-3 rounded-full ${stat.bg}`, children: _jsx(stat.icon, { className: `w-6 h-6 ${stat.color}` }) })] }) }) }, stat.title))) }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs(Card, { children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between", children: [_jsxs("div", { children: [_jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Activity, { className: "w-5 h-5" }), "Son Aktiviteler"] }), _jsx(CardDescription, { children: "Son eklenen aktiviteler" })] }), _jsxs(Button, { variant: "ghost", size: "sm", onClick: () => navigate('/activities'), children: ["T\u00FCm\u00FC ", _jsx(ArrowRight, { className: "w-4 h-4 ml-1" })] })] }), _jsx(CardContent, { children: recentActivities.length === 0 ? (_jsx("p", { className: "text-gray-500 text-center py-4", children: "Hen\u00FCz aktivite yok" })) : (_jsx("div", { className: "space-y-3", children: recentActivities.map((activity) => (_jsxs("div", { className: "flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50", children: [_jsx("span", { className: "text-2xl", children: getActivityIcon(activity.type) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "font-medium text-gray-900 truncate", children: activity.subject }), _jsx("p", { className: "text-sm text-gray-500 truncate", children: activity.notes }), _jsxs("div", { className: "flex items-center gap-2 mt-1", children: [_jsx(Clock, { className: "w-3 h-3 text-gray-400" }), _jsx("span", { className: "text-xs text-gray-400", children: formatDate(activity.activity_date) })] })] })] }, activity.id))) })) })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between", children: [_jsxs("div", { children: [_jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Building2, { className: "w-5 h-5" }), "Son Eklenen Firmalar"] }), _jsx(CardDescription, { children: "Yeni eklenen firmalar" })] }), _jsxs(Button, { variant: "ghost", size: "sm", onClick: () => navigate('/companies'), children: ["T\u00FCm\u00FC ", _jsx(ArrowRight, { className: "w-4 h-4 ml-1" })] })] }), _jsx(CardContent, { children: recentCompanies.length === 0 ? (_jsx("p", { className: "text-gray-500 text-center py-4", children: "Hen\u00FCz firma yok" })) : (_jsx("div", { className: "space-y-3", children: recentCompanies.map((company) => (_jsxs("div", { className: "flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer", onClick: () => navigate(`/companies/${company.id}`), children: [_jsx("div", { className: "w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center", children: _jsx(Building2, { className: "w-5 h-5 text-blue-600" }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "font-medium text-gray-900 truncate", children: company.name }), _jsx("p", { className: "text-sm text-gray-500", children: company.sector || 'Sektör belirtilmemiş' })] }), _jsx("span", { className: "text-xs text-gray-400", children: formatDate(company.created_at) })] }, company.id))) })) })] })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "H\u0131zl\u0131 \u0130\u015Flemler" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [_jsxs(Button, { variant: "outline", className: "h-20 flex-col gap-2", onClick: () => navigate('/companies'), children: [_jsx(Building2, { className: "w-6 h-6" }), _jsx("span", { children: "Firma Ekle" })] }), _jsxs(Button, { variant: "outline", className: "h-20 flex-col gap-2", onClick: () => navigate('/contacts'), children: [_jsx(Users, { className: "w-6 h-6" }), _jsx("span", { children: "Ki\u015Fi Ekle" })] }), _jsxs(Button, { variant: "outline", className: "h-20 flex-col gap-2", onClick: () => navigate('/projects'), children: [_jsx(FolderOpen, { className: "w-6 h-6" }), _jsx("span", { children: "Proje Ekle" })] }), _jsxs(Button, { variant: "outline", className: "h-20 flex-col gap-2", onClick: () => navigate('/documents'), children: [_jsx(FileText, { className: "w-6 h-6" }), _jsx("span", { children: "D\u00F6k\u00FCman Ekle" })] })] }) })] })] }));
};
