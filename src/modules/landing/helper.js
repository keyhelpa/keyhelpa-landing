export default {
  data: {
    agent: {
      helps: [
        {
          title: "Property Management help",
          description: () => {
            return (
              <p>
                Open for inspections
                <br />
                Condition reports
                <br />
                Marketing
              </p>
            );
          },
          url: "k6M5C-oKw9k",
        },
        {
          title: "Sales Assistance help",
          description: () => {
            return (
              <p>
                Open for inspections
                <br />
                Admin support
                <br />
                Marketing
              </p>
            );
          },
          url: "5sMKX22BHeE",
        },
      ],
      features: [
        {
          title: "Create agency profile.",
          description:
            "A one-off setup that includes payment details for future work engagements and is editable anytime.",
          template: "up",
        },
        {
          title: "Post a job.  It’s free!",
          description:
            "Draft and upload your job requirements then automatically receive proposals from qualified freelancers. Or, browse through profiles.",
          template: "down",
        },
        {
          title: "Choose a Helpa.",
          description:
            "Review Helpa profiles, message in real-time, compare offers and accept what’s right for you.",
          template: "up",
        },
        {
          title: "Pay securely &  on time.",
          description:
            "KeyHelpa’s payment system releases payment once job milestones have been completed to satisfaction and authorisation to release funds confirmed.",
          template: "circle",
        },
      ],
      others: [
        {
          title: "Find the right help. Right now!",
          description: () => {
            return (
              <p>
                Quickly and easily access a pool of available freelancers who
                are familiar with the real estate and property management
                industry, the suburbs where you need work done and the job that
                needs doing.
                <br />
                <br />
                <br />
                Search profiles for a freelancer, or browse by skills, years of
                experience, area, service and more. Then select the type of help
                and price that’s right for you and your agency. No more
                full-time wages that you don’t need to pay - and more money
                saved.
              </p>
            );
          },
          url: require("assets/handshake-gray.png"),
          template: "left",
        },
        {
          title: "Total control. Constant contact.",
          description: () => {
            return (
              <p>
                Send instant messages to the person you choose as your Helpa.
                Once a job has been offered and accepted, you can automatically
                privately message one another so you’re in constant contact
                throughout. You’re in total control to communicate as and when
                you need to.
              </p>
            );
          },
          url: require("assets/mobile-hold-gray.png"),
          template: "right",
        },
        {
          title: "Your investment. Protected.",
          description: () => {
            return (
              <p>
                Once your job has been accepted by a Helpa, the agreed payment
                is securely held by KeyHelpa's payment system. Only once the job
                has been completed to your satisfaction, do you authorise for
                your Helpa's funds to be released. With the touch of a button,
                you can approve the automatic distribution of a payment in the
                next payment run. So you can get the help you need knowing that
                your investment is protected.
              </p>
            );
          },
          url: require("assets/money-hold-gray.png"),
          template: "left",
        },
      ],
    },
    helpa: {
      helps: [
        {
          title: "Property Management help",
          description: () => {
            return (
              <p>
                Open for inspections
                <br />
                Condition reports
                <br />
                Accounts
              </p>
            );
          },
          url: "k6M5C-oKw9k",
        },
        {
          title: "Sales Assistance help",
          description: () => {
            return (
              <p>
                Open for inspections
                <br />
                Admin support
                <br />
                Marketing
              </p>
            );
          },
          url: "5sMKX22BHeE",
        },
      ],
      features: [
        {
          title: "Create your personal profile.",
          description:
            "Create your profile and upload a photo. Choose the days, times, locations and hours you’re willing to work.",
          template: "up-pink",
        },
        {
          title: "Browse jobs.",
          description:
            "View suitable jobs using filters. Save your search for automatic job alerts when work becomes available.",
          template: "down-pink",
        },
        {
          title: "Prepare your offer.",
          description:
            "Put your best foot forward and submit a work proposal with the total cost or your hourly rate.",
          template: "up-pink",
        },
        {
          title: "Get the job and earn.",
          description:
            "Once your offer is accepted, deliver high -quality help, earn the agreed amount and shoot for that 5-star raiting.",
          template: "circle-pink",
        },
      ],
      others: [
        {
          title: "Total control. Constant contact.",
          description: () => {
            return (
              <p>
                Send instant messages to the client/employer who chose you as a
                Helpa. Once a job has been offered and accepted, you can
                automatically privately message one another so you’re in
                constant contact throughout. You’re in total control to
                communicate as and when you need to.
              </p>
            );
          },
          url: require("assets/mobile-hold-pink.png"),
          template: "left",
        },
        {
          title: "Your investment. Protected.",
          description: () => {
            return (
              <p>
                Once you have accepted a job, the agreed payment is securely
                held by KeyHelpa's payment system. Once the job has been
                completed to the client's satisfaction, they authorise for your
                funds to be released. With the touch of a button, they can
                approve your payment to be automatically distributed in the next
                payment run. So you can do your work knowing that your payment
                is secured and ready for transfer.
              </p>
            );
          },
          url: require("assets/money-hold-pink.png"),
          template: "right",
        },
      ],
    },
  },
};
