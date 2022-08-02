import { Badge, FileCopy, Person, Search, Security } from "@mui/icons-material";

export default {
    agent: [{
        title: 'Create account',
        icon: Person,
        description: "Get started  with KeyHelpa and hire Helpa when you need help.",
        route: '/agent/guides/create_account'
    }, {
        title: 'Set up profile',
        icon: Person,
        description: "Complete your profile setup to access all features of KeyHelpa.",
        route: '/agent/guides/setup_profile'
    }, {
        title: 'Search helpa',
        icon: Person,
        description: "Look for the specific Helpa that match with job you’re hiring.",
        route: '/agent/guides/search_helpa'
    }, {
        title: 'Create job posting',
        icon: Person,
        description: "Start your job posting to attract, to invite and to hire Helpa.",
        route: '/agent/guides/create_job_posting'
    }, {
        title: 'Send invite',
        icon: Person,
        description: "Invite any  Helpa you like to check on your job post.",
        route: '/agent/guides/send_invite'
    }, {
        title: 'Accept proposal',
        icon: Person,
        description: "Approve job proposals sent to you by Helpa",
        route: '/agent/guides/accept_proposal'
    }, {
        title: 'Interview helpa',
        icon: Person,
        description: "Schedule and invite a helpa over an interview to discuss the job.",
        route: '/agent/guides/interview_helpa'
    }, {
        title: 'Hire helpa',
        icon: Person,
        description: "Let Helpa work on your projects by hiring them.",
        route: '/agent/guides/hire_helpa'
    }, {
        title: 'End contract',
        icon: Person,
        description: "Be guided on how to end the job contract between you and Helpa.",
        route: '/agent/guides/end_contract'
    }, {
        title: 'Pause contract',
        icon: Person,
        description: "Be guided on how to pause the job contract between you and Helpa.",
        route: '/agent/guides/pause_contract'
    }, {
        title: 'Dispute contract',
        icon: Person,
        description: "Learn how to open dispute on the contract between you and Helpa.",
        route: '/agent/guides/dispute_contract'
    }, {
        title: 'Edit basic info',
        icon: Person,
        description: "Be guided on how to update your basic information.",
        route: '/agent/guides/edit_basic_info'
    }, {
        title: 'Edit agency info',
        icon: Person,
        description: "Be guided on how to update your agency information.",
        route: '/agent/guides/edit_agency_info'
    }, {
        title: 'Update bank details',
        icon: Person,
        description: "Managed authorized bank details you connected with KeyHelpa.",
        route: '/agent/guides/update_bank_details'
    }, {
        title: 'Update password',
        icon: Person,
        description: "Make sure to keep your password private and secured.",
        route: '/agent/guides/update_password'
    }, {
        title: 'Manage security',
        icon: Person,
        description: "Set securities to your KeyHelpa account for extra protection.",
        route: '/agent/guides/manage_security'
    }, {
        title: 'Manage notifications',
        icon: Person,
        description: "Set your notifications to received any kind of updates you want.",
        route: '/agent/guides/manage_notifications'
    }],
    helpa: [{
        title: 'Set up profile',
        icon: Badge,
        description: "Get started  with KeyHelpa and hire Helpa when you need help.",
        route: '/helpa/guides/setup_profile'
    }, {
        title: 'Search job',
        icon: Search,
        description: "Get started  with KeyHelpa and hire Helpa when you need help.",
        route: '/helpa/guides/search_job'
    }, {
        title: 'Submit proposal',
        icon: Person,
        description: "Send your proposal to the job you are interested to received by Agent.",
        route: '/helpa/guides/submit_proposal'
    }, {
        title: 'End contract',
        icon: Person,
        description: "Be guided on how to end the job contract between you and Agent.",
        route: '/helpa/guides/end_contract'
    }, {
        title: 'Pause contract',
        icon: FileCopy,
        description: "Be guided on how to pause the job contract between you and Agent.",
        route: '/helpa/guides/pause_contract'
    }, {
        title: 'Dispute contract',
        icon: Person,
        description: "Learn how to open dispute on the contract between you and Agent.",
        route: '/helpa/guides/dispute_contract'
    }, {
        title: 'Edit basic info',
        icon: Person,
        description: "Be guided on how to update your basic information.",
        route: '/helpa/guides/edit_basic_info'
    }, {
        title: 'Manage socials',
        icon: Person,
        description: "Add your social media profile links to your KeyHelpa account.",
        route: '/helpa/guides/manage_socials'
    }, {
        title: 'Update bank details',
        icon: Person,
        description: "Managed authorized bank details you connected with KeyHelpa.",
        route: '/helpa/guides/update_bank_details'
    }, {
        title: 'Update password',
        icon: Person,
        description: "Make sure to keep your password private and secured.",
        route: '/helpa/guides/update_passwords'
    }, {
        title: 'Manage security',
        icon: Security,
        description: "Set securities to your KeyHelpa account for extra protection.",
        route: '/helpa/guides/manage_security'
    }, {
        title: 'Update work experience',
        icon: Person,
        description: "Keep your work experiences updated to impress hiring Agents.",
        route: '/helpa/guides/update_work_experience'
    }, {
        title: 'Update work preferences',
        icon: Person,
        description: "Set your work perferences to allow Agent know your limits.",
        route: '/helpa/guides/update_work_preferences'
    }, {
        title: 'Update work availabilty',
        icon: Person,
        description: "Set your work days and time  to allow Agent know your availability.",
        route: '/helpa/guides/update_work_availability'
    }, {
        title: 'Update other data',
        icon: Person,
        description: "Set your other data to add more credibility to your profile.",
        route: '/helpa/guides/update_other_data'
    }, {
        title: 'Manage notifications',
        icon: Person,
        description: "Set your notifications to received any kind of updates you want.",
        route: '/helpa/guides/manage_notifications'
    }],
    getMenu(menu, route){
        if(route == '/helpa/guides' || route == '/agent/guides'){
            return {
                title: 'Welcome to KeyHelpa',
                description: null,
                route: route
            }
        }
        let item = menu.filter(item => {
            return item.route == route
        })
        return item ? item[0] : null
    }
}