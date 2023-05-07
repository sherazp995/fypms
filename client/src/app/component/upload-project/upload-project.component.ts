import {Component, ViewChild} from '@angular/core'
import {Router} from '@angular/router'
import {ApiService} from 'app/services/api.service'
import {AppService} from 'app/services/app.service'

@Component({
  selector: 'app-upload-project',
  templateUrl: './upload-project.component.html',
  styleUrls: ['./upload-project.component.css']
})
export class UploadProjectComponent {

  constructor(private apiServices: ApiService, private router: Router, private appServices: AppService) {
  }

  upload_project = {
    title: '',
    description: '',
    skills: [],
    domain: '',
    languages: [],
    tools: [],
    maxStudents: 1,
    project_file: ""
  }
  upload_file: File;
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
  availableSkills: string[] = [
    "HTML","CSS","JavaScript","Python","Java","C#","C++","PHP","Ruby","Swift","Objective-C",
    "SQL","NoSQL","Git","Angular","React","Vue.js","Node.js","ASP.NET","Django","Flask","Spring","Android Development",
    "iOS Development","Cross-platform Mobile App Development","UI/UX Design","Agile Methodology","Scrum","Project Management",
    "Problem Solving","Data Structures","Algorithms","Testing and Debugging","Security","Cloud Computing","API Integration",
    "Responsive Web Design","Version Control","Database Design","Network Administration","Data Analysis","Machine Learning",
    "Artificial Intelligence","Big Data","Data Visualization","DevOps","Linux Administration","Windows Server Administration",
    "Technical Writing","Troubleshooting","Teamwork","Communication Skills"
  ];
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
        aa[key] = data[key].join(", ")
      } else {
        aa[key] = data[key]
      }
    }
    return aa
  }

  onFileSelected(event: any) {
    this.upload_file = event.target.files[0]; // Store the selected image file
  }

  async upload() {
    let file: any = null;
    let project = this.normalize_values(this.upload_project);
    let user = this.appServices.get_user();
    if (this.upload_file) {
      project.project_file = await this.appServices.getBase64(this.upload_file)
    }
    this.apiServices.upload_project({user, project}).subscribe((res) => {
      this.router.navigate(['/projects'])
    })
  }
}
