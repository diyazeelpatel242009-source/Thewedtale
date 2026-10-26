document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */


    const modalBackdrop = document.getElementById("modalBackdrop");
    const authModal = document.getElementById("authModal");
    const modalClose = document.getElementById("modalClose");

    const businessBtn = document.getElementById("businessBtn");
    const coupleBtn = document.getElementById("coupleBtn");

    const accountButton = document.getElementById("accountButton");
    const mobileAccountButton =
        document.getElementById("mobileAccountButton");

    const menuButton = document.getElementById("menuButton");
    const mobileMenu = document.getElementById("mobileMenu");

    const authForm = document.getElementById("authForm");

    const authName = document.getElementById("authName");
    const authNameGroup = document.getElementById("authNameGroup");

    const authEmail = document.getElementById("authEmail");
    const authPassword = document.getElementById("authPassword");

    const authTitle = document.getElementById("authTitle");
    const authDescription =
        document.getElementById("authDescription");

    const authEyebrow =
        document.getElementById("authEyebrow");

    const authSubmit =
        document.getElementById("authSubmit");

    const authMessage =
        document.getElementById("authMessage");

    const authSwitchText =
        document.getElementById("authSwitchText");

    const authSwitchButton =
        document.getElementById("authSwitchButton");


    /* =====================================================
       STATE
    ===================================================== */

    let currentAccountType = "couple";
    let authMode = "signup";


    /* =====================================================
       OPEN AUTH MODAL
    ===================================================== */

    function openAuth(accountType = "couple", mode = "signup") {

        currentAccountType = accountType;
        authMode = mode;

        updateAuthModal();

        if (!modalBackdrop || !authModal) {
            return;
        }

        modalBackdrop.classList.add("open");
        authModal.classList.add("open");

        document.body.classList.add("modal-open");

        if (authEmail) {
            authEmail.focus();
        }
    }


    /* =====================================================
       CLOSE AUTH MODAL
    ===================================================== */

    function closeAuth() {

        if (!modalBackdrop || !authModal) {
            return;
        }

        modalBackdrop.classList.remove("open");
        authModal.classList.remove("open");

        document.body.classList.remove("modal-open");

        if (authMessage) {
            authMessage.textContent = "";
        }
    }


    /* =====================================================
       UPDATE AUTH MODAL
    ===================================================== */

    function updateAuthModal() {

        const isBusiness =
            currentAccountType === "business";

        /* ---------------------------------------------
           SIGNUP
        --------------------------------------------- */

        if (authMode === "signup") {

            if (authEyebrow) {
                authEyebrow.textContent =
                    isBusiness
                        ? "THE WED TALE · BUSINESS"
                        : "THE WED TALE · COUPLES";
            }

            if (authTitle) {
                authTitle.textContent =
                    isBusiness
                        ? "List your business."
                        : "Create your couple account.";
            }

            if (authDescription) {
                authDescription.textContent =
                    isBusiness
                        ? "Create your business account and start building your listing."
                        : "Save venues, vendors and inspiration for your wedding.";
            }

            if (authSubmit) {
                authSubmit.textContent =
                    isBusiness
                        ? "Create business account"
                        : "Create couple account";
            }

            if (authSwitchText) {
                authSwitchText.textContent =
                    "Already have an account?";
            }

            if (authSwitchButton) {
                authSwitchButton.textContent =
                    "Sign in";
            }

            if (authNameGroup) {
                authNameGroup.style.display = "block";
            }

        }

        /* ---------------------------------------------
           LOGIN
        --------------------------------------------- */

        else {

            if (authEyebrow) {
                authEyebrow.textContent =
                    "THE WED TALE · ACCOUNT";
            }

            if (authTitle) {
                authTitle.textContent =
                    "Welcome back.";
            }

            if (authDescription) {
                authDescription.textContent =
                    "Sign in to continue to The Wed Tale.";
            }

            if (authSubmit) {
                authSubmit.textContent =
                    "Sign in";
            }

            if (authSwitchText) {
                authSwitchText.textContent =
                    "Don't have an account?";
            }

            if (authSwitchButton) {
                authSwitchButton.textContent =
                    "Create account";
            }

            if (authNameGroup) {
                authNameGroup.style.display = "none";
            }
        }
    }


    /* =====================================================
       OPEN BUSINESS SIGNUP
    ===================================================== */

    if (businessBtn) {

        businessBtn.addEventListener("click", () => {

            openAuth("business", "signup");

        });
    }


    /* =====================================================
       OPEN COUPLE SIGNUP
    ===================================================== */

    if (coupleBtn) {

        coupleBtn.addEventListener("click", () => {

            openAuth("couple", "signup");

        });
    }


    /* =====================================================
       ACCOUNT ICON → LOGIN DIRECTLY
    ===================================================== */

    if (accountButton) {

        accountButton.addEventListener("click", () => {

            openAuth("couple", "login");

        });
    }


    /* =====================================================
       MOBILE ACCOUNT → LOGIN DIRECTLY
    ===================================================== */

    if (mobileAccountButton) {

        mobileAccountButton.addEventListener("click", () => {

            if (mobileMenu) {
                mobileMenu.classList.remove("open");
            }

            openAuth("couple", "login");

        });
    }


    /* =====================================================
       CLOSE BUTTON
    ===================================================== */

    if (modalClose) {

        modalClose.addEventListener(
            "click",
            closeAuth
        );
    }


    /* =====================================================
       CLICK OUTSIDE MODAL
    ===================================================== */

    if (modalBackdrop) {

        modalBackdrop.addEventListener(
            "click",
            (event) => {

                if (event.target === modalBackdrop) {
                    closeAuth();
                }

            }
        );
    }


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {
            closeAuth();
        }

    });


    /* =====================================================
       SWITCH LOGIN / SIGNUP
    ===================================================== */

    if (authSwitchButton) {

        authSwitchButton.addEventListener("click", () => {

            authMode =
                authMode === "signup"
                    ? "login"
                    : "signup";

            if (authMessage) {
                authMessage.textContent = "";
            }

            if (authForm) {
                authForm.reset();
            }

            updateAuthModal();

        });
    }


    /* =====================================================
       GET USER ROLE
    ===================================================== */

    async function getUserRole(userId) {

        const { data, error } =
            await supabaseClient
                .from("profiles")
                .select("role")
                .eq("id", userId)
                .single();

        if (error) {

            console.error(
                "Could not load user role:",
                error
            );

            return null;
        }

        return data?.role || null;
    }


    /* =====================================================
       DASHBOARD ROUTING
    ===================================================== */

    async function redirectToDashboard(user) {

        if (!user) {
            return;
        }

        const role =
            await getUserRole(user.id);

        if (role === "business") {

            window.location.href =
                "business-dashboard.html";

            return;
        }

        if (role === "admin") {

            window.location.href =
                "admin-dashboard.html";

            return;
        }

        /*
         Default account type is couple.
        */

        window.location.href =
            "couple-dashboard.html";
    }


    /* =====================================================
       AUTH FORM
    ===================================================== */

    if (authForm) {

        authForm.addEventListener(
            "submit",
            async (event) => {

                event.preventDefault();

                const email =
                    authEmail.value.trim();

                const password =
                    authPassword.value;

                const name =
                    authName.value.trim();


                /* -----------------------------------------
                   BASIC VALIDATION
                ----------------------------------------- */

                if (!email || !password) {

                    authMessage.textContent =
                        "Please enter your email and password.";

                    return;
                }


                if (
                    authMode === "signup" &&
                    !name
                ) {

                    authMessage.textContent =
                        "Please enter your name.";

                    return;
                }


                /* -----------------------------------------
                   LOADING STATE
                ----------------------------------------- */

                authSubmit.disabled = true;

                authSubmit.textContent =
                    "Please wait...";

                authMessage.textContent = "";


                try {

                    /* =====================================
                       SIGN UP
                    ===================================== */

                    if (authMode === "signup") {

                        const {
                            data,
                            error
                        } =
                            await supabaseClient.auth.signUp({

                                email: email,

                                password: password,

                                options: {

                                    data: {

                                        full_name: name,

                                        role:
                                            currentAccountType

                                    },

                                    /*
                                     Important:
                                     sends email confirmation
                                     back to the Netlify website.
                                    */

                                    emailRedirectTo:
                                        window.location.origin +
                                        "/index.html"
                                }

                            });


                        if (error) {
                            throw error;
                        }


                        /* ---------------------------------
                           SESSION CREATED IMMEDIATELY
                        --------------------------------- */

                        if (data?.session && data?.user) {

                            authMessage.textContent =
                                "Account created. Opening your dashboard...";

                            setTimeout(() => {

                                redirectToDashboard(
                                    data.user
                                );

                            }, 700);

                        }


                        /* ---------------------------------
                           EMAIL CONFIRMATION REQUIRED
                        --------------------------------- */

                        else {

                            authMessage.textContent =
                                "Account created. Please check your email and confirm your account before signing in.";

                            if (authForm) {
                                authForm.reset();
                            }

                        }

                    }


                    /* =====================================
                       LOGIN
                    ===================================== */

                    else {

                        const {
                            data,
                            error
                        } =
                            await supabaseClient.auth.signInWithPassword({

                                email: email,

                                password: password

                            });


                        if (error) {
                            throw error;
                        }


                        if (!data?.user) {

                            throw new Error(
                                "Unable to sign in. Please try again."
                            );

                        }


                        authMessage.textContent =
                            "Signed in. Opening your dashboard...";


                        setTimeout(() => {

                            redirectToDashboard(
                                data.user
                            );

                        }, 500);

                    }


                }

                catch (error) {

                    console.error(
                        "Authentication error:",
                        error
                    );


                    let message =
                        error?.message ||
                        "Something went wrong. Please try again.";


                    /*
                     Make common Supabase messages
                     easier to understand.
                    */

                    if (
                        message.toLowerCase()
                            .includes("email not confirmed")
                    ) {

                        message =
                            "Please confirm your email before signing in.";

                    }


                    authMessage.textContent =
                        message;

                }

                finally {

                    authSubmit.disabled = false;

                    updateAuthModal();

                }

            }
        );
    }


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    if (menuButton && mobileMenu) {

        menuButton.addEventListener("click", () => {

            mobileMenu.classList.toggle("open");

        });
    }


    /* =====================================================
       SUPABASE AUTH STATE
    ===================================================== */

    supabaseClient.auth.onAuthStateChange(
        (event, session) => {

            console.log(
                "Supabase auth:",
                event
            );

        }
    );


    /* =====================================================
       LOGOUT
    ===================================================== */

    window.twtLogout = async function () {

        try {

            await supabaseClient.auth.signOut();

        }

        catch (error) {

            console.error(
                "Logout error:",
                error
            );

        }

        window.location.href =
            "index.html";
    };


});