import {Component} from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router'
import {ApiService} from 'app/services/api.service'
import {AppService} from 'app/services/app.service'

@Component({
  selector: 'app-upload-project',
  templateUrl: './upload-project.component.html',
  styleUrls: ['./upload-project.component.css']
})
export class UploadProjectComponent {
  projectForm!: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private apiServices: ApiService, private router: Router, private appServices: AppService) {
  }
  
  ngOnInit(): void {
    this.projectForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      skills: [[], Validators.required],
      domain: ['', Validators.required],
      user: ['', Validators.required],
      languages: [[], Validators.required],
      tools: [[], Validators.required],
      maxStudents: [1, Validators.required],
      project_file: ['', Validators.required],
    });
  }

  upload_project = {
    title: '',
    description: '',
    skills: [],
    domain: '',
    languages: [],
    tools: [],
    maxStudents: 1,
    project_file: null
  }
  upload_file: File;
  domains: string[] = [];
  availableDomains: string[] = [
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
  ]
  skills: string[] = [];
  availableSkills: string[] = [
    "HTML","CSS","JavaScript","Python","Java","C#","C++","PHP","Ruby","Swift","Objective-C",
    "SQL","NoSQL","Git","Angular","React","Vue.js","Node.js","ASP.NET","Django","Flask","Spring","Android Development",
    "iOS Development","Cross-platform Mobile App Development","UI/UX Design","Agile Methodology","Scrum","Project Management",
    "Problem Solving","Data Structures","Algorithms","Testing and Debugging","Security","Cloud Computing","API Integration",
    "Responsive Web Design","Version Control","Database Design","Network Administration","Data Analysis","Machine Learning",
    "Artificial Intelligence","Big Data","Data Visualization","DevOps","Linux Administration","Windows Server Administration",
    "Technical Writing","Troubleshooting","Teamwork","Communication Skills"
  ];
  languages: string[] = [];
  availableLanguages: string[] = [
    "Java", "Python", "C++", "C#", "JavaScript", "Ruby", "Go", "Swift", "Kotlin", "TypeScript", "PHP", "Rust", "Perl", "Objective-C",
    "MATLAB", "Haskell", "Lua", "Shell scripting (Bash, PowerShell)", "Scala", "Groovy", "Dart", "Julia", "C", "HTML/CSS", "SQL",
    "R", "Arduino", "Assembly", "VB.NET", "PL/SQL", "Prolog", "Ada", "Scheme", "Lisp", "F#", "Elixir", "OCaml", "Delphi", "Visual Basic",
    "COBOL", "Fortran", "Pascal", "LabVIEW", "Verilog", "VHDL", "ActionScript", "Groovy", "ColdFusion", "ABAP", "Objective-C++",
    "Racket", "Smalltalk", "Swift", "Perl", "Ruby", "Rust", "Erlang", "Tcl", "Julia", "Scratch", "Logo", "Alice", "Ada", "Scala",
    "Fortran", "Scheme", "COBOL", "D", "Forth", "Groovy", "MATLAB", "Clojure", "Lua", "Elixir", "Haskell", "OCaml", "Prolog", "Lisp",
    "Smalltalk", "Dart", "Kotlin", "Swift", "R", "TypeScript", "CoffeeScript", "Assembly", "Verilog", "VHDL", "PL/SQL", "Transact-SQL",
    "PowerShell", "Bash", "Batch scripting"
  ];
  tools: string[] = [];
  availableTools: string[] = [
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

  toggleSelection(item: string, data: string[]): void {
    const index = data.indexOf(item);
    if (index > -1) {
      data.splice(index, 1);
    } else {
      data.push(item);
    }
  }

  normalize_values(data) {
    let aa: any = {}
    for (let key in data) {
      if (typeof data[key] === "object") {
        aa[key] = data[key].join(",")
      } else {
        aa[key] = data[key]
      }
    }
    return aa
  }

  onFileSelected(event: any) {
    this.upload_file = event.target.files[0]; // Store the selected image file
  }
  
  toFormData(data) {
    const formData = new FormData();
    for(let key in data){
      formData.append(key, data[key]);
    }
    return formData;
  }

  async upload() {
    // Handle form submission here
    let user = this.appServices.get_user();
    let formData = this.projectForm.value;
    formData.skills = this.skills;
    formData.languages = this.languages;
    formData.tools = this.tools;
    formData.supervisor = user._id;
    formData = this.normalize_values(formData)
    formData.project_file = this.upload_file

    this.apiServices.upload_project(this.toFormData(formData)).subscribe((res) => {
      console.log(res)
      if (res.error) {
        this.appServices.showFlash({error: res.error.message})
      } else {
        this.appServices.showFlash({success: res.message})
        this.router.navigate(['/projects'])
      }
    })
  }
}
