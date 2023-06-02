import {
  DocumentScannerOutlined,
  NotificationsActive,
  LockClock,
  AccountBalance,
  AddBusiness,
  BorderColor,
  SimCardAlert,
  FileOpen,
  NoSim,
  RecordVoiceOver,
  Badge,
  FileCopy,
  Person,
  Search,
  Security,
  PersonAdd,
  PersonSearch,
  PostAddOutlined,
  ContactMail,
  FactCheck,
  GroupAdd,
} from "@mui/icons-material";
import {
  HistoryEdu,
  DesignServices,
  EventAvailable,
  BusinessCenter,
  Share,
  UploadFile,
  WorkHistory,
} from "@mui/icons-material";
export default {
  agent: [
    {
      title: "Create account",
      icon: PersonAdd,
      description:
        "Get started  with KeyHelpa and hire Helpa when you need help.",
      route: "/agent/guides/create_account",
      url: "",
    },
    {
      title: "Set up profile",
      icon: Badge,
      description:
        "Complete your profile setup to access all features of KeyHelpa.",
      route: "/agent/guides/setup_profile",
      url: "",
    },
    {
      title: "Search helpa",
      icon: PersonSearch,
      description:
        "Look for the specific Helpa that match with job you’re hiring.",
      route: "/agent/guides/search_helpa",
      url: "",
    },
    {
      title: "Create job posting",
      icon: PostAddOutlined,
      description:
        "Start your job posting to attract, to invite and to hire Helpa.",
      route: "/agent/guides/create_job_posting",
      url: "",
    },
    {
      title: "Send invite",
      icon: GroupAdd,
      description: "Invite any  Helpa you like to check on your job post.",
      route: "/agent/guides/send_invite",
      url: "",
    },
    {
      title: "Accept proposal",
      icon: FactCheck,
      description: "Approve job proposals sent to you by Helpa",
      route: "/agent/guides/accept_proposal",
      url: "",
    },
    {
      title: "Interview helpa",
      icon: RecordVoiceOver,
      description:
        "Schedule and invite a helpa over an interview to discuss the job.",
      route: "/agent/guides/interview_helpa",
      url: "",
    },
    {
      title: "Hire helpa",
      icon: ContactMail,
      description: "Let Helpa work on your projects by hiring them.",
      route: "/agent/guides/hire_helpa",
      url: "",
    },
    {
      title: "Create Contract",
      icon: DocumentScannerOutlined,
      description:
        "Send the final agreement to Helpa for them to start working.",
      route: "/agent/guides/create_contract",
      url: "",
    },
    {
      title: "End contract",
      icon: NoSim,
      description:
        "Be guided on how to end the job contract between you and Helpa.",
      route: "/agent/guides/end_contract",
      url: "",
    },
    {
      title: "Pause contract",
      icon: FileOpen,
      description:
        "Be guided on how to pause the job contract between you and Helpa.",
      route: "/agent/guides/pause_contract",
      url: "",
    },
    {
      title: "Dispute contract",
      icon: SimCardAlert,
      description:
        "Learn how to open dispute on the contract between you and Helpa.",
      route: "/agent/guides/dispute_contract",
      url: "",
    },
    {
      title: "Edit basic info",
      icon: BorderColor,
      description: "Be guided on how to update your basic information.",
      route: "/agent/guides/edit_basic_info",
      url: "",
    },
    {
      title: "Edit agency info",
      icon: AddBusiness,
      description: "Be guided on how to update your agency information.",
      route: "/agent/guides/edit_agency_info",
      url: "",
    },
    {
      title: "Update bank details",
      icon: AccountBalance,
      description:
        "Managed authorized bank details you connected with KeyHelpa.",
      route: "/agent/guides/update_bank_details",
      url: "",
    },
    {
      title: "Update password",
      icon: LockClock,
      description: "Make sure to keep your password private and secured.",
      route: "/agent/guides/update_password",
      url: "",
    },
    {
      title: "Manage security",
      icon: Security,
      description:
        "Set securities to your KeyHelpa account for extra protection.",
      route: "/agent/guides/manage_security",
      url: "",
    },
    {
      title: "Manage notifications",
      icon: NotificationsActive,
      description:
        "Set your notifications to received any kind of updates you want.",
      route: "/agent/guides/manage_notifications",
      url: "",
    },
  ],

  helpa: [
    {
      title: "Create account",
      icon: PersonAdd,
      description: "Be guided on how to get started with KeyHelpa.",
      route: "/helpa/guides/create_account",
      url: "",
    },
    {
      title: "Set up profile",
      icon: Badge,
      description:
        "Complete your profile setup to access all features of KeyHelpa.",
      route: "/helpa/guides/setup_profile",
      url: "",
    },
    {
      title: "Search job",
      icon: Search,
      description: "Look for the job that match your skills.",
      route: "/helpa/guides/search_job",
      url: "",
    },
    {
      title: "Submit proposal",
      icon: UploadFile,
      description: "Send proposals to desired agents and or job.",
      route: "/helpa/guides/submit_proposal",
      url: "",
    },
    {
      title: "End contract",
      icon: NoSim,
      description:
        "Be guided on how to end the job contract between you and Agent.",
      route: "/helpa/guides/end_contract",
      url: "",
    },
    {
      title: "Pause contract",
      icon: FileOpen,
      description:
        "Be guided on how to pause the job contract between you and Agent.",
      route: "/helpa/guides/pause_contract",
      url: "",
    },
    {
      title: "Dispute contract",
      icon: SimCardAlert,
      description:
        "Learn how to open dispute on the contract between you and Agent.",
      route: "/helpa/guides/dispute_contract",
      url: "",
    },
    {
      title: "Edit basic info",
      icon: BorderColor,
      description: "Be guided on how to update your basic information.",
      route: "/helpa/guides/edit_basic_info",
      url: "",
    },
    {
      title: "Manage socials",
      icon: Share,
      description:
        "Add your social media profile links to your KeyHelpa account.",
      route: "/helpa/guides/manage_socials",
      url: "",
    },
    {
      title: "Update bank details",
      icon: AccountBalance,
      description:
        "Managed authorized bank details you connected with KeyHelpa.",
      route: "/helpa/guides/update_bank_details",
      url: "",
    },
    {
      title: "Update password",
      icon: LockClock,
      description: "Make sure to keep your password private and secured.",
      route: "/helpa/guides/update_password",
      url: "",
    },
    {
      title: "Manage security",
      icon: Security,
      description:
        "Set securities to your KeyHelpa account for extra protection.",
      route: "/helpa/guides/manage_security",
      url: "",
    },
    {
      title: "Update work experience",
      icon: WorkHistory,
      description:
        "Keep your work experiences updated to impress hiring Agents.",
      route: "/helpa/guides/update_work_experience",
      url: "",
    },
    {
      title: "Update work preferences",
      icon: BusinessCenter,
      description: "Set your work preferences for agents to know your limits.",
      route: "/helpa/guides/update_work_preferences",
      url: "",
    },
    {
      title: "Update work availabilty",
      icon: EventAvailable,
      description:
        "Set your work days and time to allow Agent know your availability.",
      route: "/helpa/guides/update_work_availability",
      url: "",
    },
    {
      title: "Update other data",
      icon: DesignServices,
      description: "Update your data to add more credibility to your profile.",
      route: "/helpa/guides/update_other_data",
      url: "",
    },
    {
      title: "Update Certificates",
      icon: HistoryEdu,
      description: "Add certificates to boost your professional credibility.",
      route: "/helpa/guides/update_certificates",
      url: "",
    },
    {
      title: "Manage notifications",
      icon: NotificationsActive,
      description:
        "Set your notifications to received any kind of updates you want.",
      route: "/helpa/guides/manage_notifications",
      url: "",
    },
  ],
  getMenu(menu, route) {
    if (route === "/helpa/guides" || route === "/agent/guides") {
      return {
        title: "Welcome to KeyHelpa",
        description: null,
        route: route,
      };
    }
    let item = menu.filter((item) => {
      return item.route == route;
    });
    return item ? item[0] : null;
  },
};
