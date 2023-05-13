"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadProjectComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var UploadProjectComponent = /** @class */ (function () {
    function UploadProjectComponent(formBuilder, apiServices, router, appServices) {
        this.formBuilder = formBuilder;
        this.apiServices = apiServices;
        this.router = router;
        this.appServices = appServices;
        this.upload_project = {
            title: '',
            description: '',
            skills: [],
            domain: '',
            languages: [],
            tools: [],
            maxStudents: 1,
            project_file: null
        };
        this.domains = [];
        this.availableDomains = [
            'Web Development',
            'Mobile App Development',
            'Software Development',
            'Database Management',
            'Network Administration',
            'Cyber-security',
            'Artificial Intelligence (AI)',
            'Machine Learning (ML)',
            'Data Science',
            'Cloud Computing',
            'DevOps',
            'E-commerce',
            'Internet of Things (IoT)',
            'Game Development',
            'Augmented Reality (AR) and Virtual Reality (VR)',
            'Big Data',
            'Business Intelligence (BI)',
            'IT Project Management',
            'IT Consulting',
            'IT Infrastructure Management'
        ];
        this.skills = [];
        this.availableSkills = [
            "HTML", "CSS", "JavaScript", "Python", "Java", "C#", "C++", "PHP", "Ruby", "Swift", "Objective-C",
            "SQL", "NoSQL", "Git", "Angular", "React", "Vue.js", "Node.js", "ASP.NET", "Django", "Flask", "Spring", "Android Development",
            "iOS Development", "Cross-platform Mobile App Development", "UI/UX Design", "Agile Methodology", "Scrum", "Project Management",
            "Problem Solving", "Data Structures", "Algorithms", "Testing and Debugging", "Security", "Cloud Computing", "API Integration",
            "Responsive Web Design", "Version Control", "Database Design", "Network Administration", "Data Analysis", "Machine Learning",
            "Artificial Intelligence", "Big Data", "Data Visualization", "DevOps", "Linux Administration", "Windows Server Administration",
            "Technical Writing", "Troubleshooting", "Teamwork", "Communication Skills"
        ];
        this.languages = [];
        this.availableLanguages = [
            "Java", "Python", "C++", "C#", "JavaScript", "Ruby", "Go", "Swift", "Kotlin", "TypeScript", "PHP", "Rust", "Perl", "Objective-C",
            "MATLAB", "Haskell", "Lua", "Shell scripting (Bash, PowerShell)", "Scala", "Groovy", "Dart", "Julia", "C", "HTML/CSS", "SQL",
            "R", "Arduino", "Assembly", "VB.NET", "PL/SQL", "Prolog", "Ada", "Scheme", "Lisp", "F#", "Elixir", "OCaml", "Delphi", "Visual Basic",
            "COBOL", "Fortran", "Pascal", "LabVIEW", "Verilog", "VHDL", "ActionScript", "Groovy", "ColdFusion", "ABAP", "Objective-C++",
            "Racket", "Smalltalk", "Swift", "Perl", "Ruby", "Rust", "Erlang", "Tcl", "Julia", "Scratch", "Logo", "Alice", "Ada", "Scala",
            "Fortran", "Scheme", "COBOL", "D", "Forth", "Groovy", "MATLAB", "Clojure", "Lua", "Elixir", "Haskell", "OCaml", "Prolog", "Lisp",
            "Smalltalk", "Dart", "Kotlin", "Swift", "R", "TypeScript", "CoffeeScript", "Assembly", "Verilog", "VHDL", "PL/SQL", "Transact-SQL",
            "PowerShell", "Bash", "Batch scripting"
        ];
        this.tools = [];
        this.availableTools = [
            'Visual Studio Code',
            'IntelliJ IDEA',
            'Eclipse',
            'Android Studio',
            'Xcode',
            'Git',
            'GitHub',
            'Bitbucket',
            'Jenkins',
            'Docker',
            'AWS',
            'Azure',
            'Heroku',
            'Firebase'
        ];
    }
    UploadProjectComponent.prototype.ngOnInit = function () {
        this.projectForm = this.formBuilder.group({
            title: ['', forms_1.Validators.required],
            description: ['', forms_1.Validators.required],
            skills: [[], forms_1.Validators.required],
            domain: ['', forms_1.Validators.required],
            user: ['', forms_1.Validators.required],
            languages: [[], forms_1.Validators.required],
            tools: [[], forms_1.Validators.required],
            maxStudents: [1, forms_1.Validators.required],
            project_file: ['', forms_1.Validators.required],
        });
    };
    UploadProjectComponent.prototype.toggleSelection = function (item, data) {
        var index = data.indexOf(item);
        if (index > -1) {
            data.splice(index, 1);
        }
        else {
            data.push(item);
        }
    };
    UploadProjectComponent.prototype.normalize_values = function (data) {
        var aa = {};
        for (var key in data) {
            if (typeof data[key] === "object") {
                aa[key] = data[key].join(",");
            }
            else {
                aa[key] = data[key];
            }
        }
        return aa;
    };
    UploadProjectComponent.prototype.onFileSelected = function (event) {
        this.upload_file = event.target.files[0]; // Store the selected image file
    };
    UploadProjectComponent.prototype.toFormData = function (data) {
        var formData = new FormData();
        for (var key in data) {
            formData.append(key, data[key]);
        }
        return formData;
    };
    UploadProjectComponent.prototype.upload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var user, formData;
            var _this = this;
            return __generator(this, function (_a) {
                user = this.appServices.get_user();
                formData = this.projectForm.value;
                formData.skills = this.skills;
                formData.languages = this.languages;
                formData.tools = this.tools;
                formData.user = user._id;
                formData = this.normalize_values(formData);
                formData.project_file = this.upload_file;
                // let file: any = null;
                // let project = this.normalize_values(this.upload_project);
                // if (this.upload_file) {
                //   project.project_file = this.upload_file
                // }
                // console.log(JSON.stringify(project))
                // console.log(project)
                this.apiServices.upload_project(this.toFormData(formData)).subscribe(function (res) {
                    console.log(res);
                    if (res.error) {
                        _this.appServices.showFlash({ error: res.error.message });
                    }
                    else {
                        _this.appServices.showFlash({ success: res.message });
                        // this.router.navigate(['/projects'])
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    UploadProjectComponent = __decorate([
        (0, core_1.Component)({
            selector: 'app-upload-project',
            templateUrl: './upload-project.component.html',
            styleUrls: ['./upload-project.component.css']
        })
    ], UploadProjectComponent);
    return UploadProjectComponent;
}());
exports.UploadProjectComponent = UploadProjectComponent;
