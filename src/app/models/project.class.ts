export class Project {
    title: string;
    explanation: string;
    img: string;
    language: string;
    web: string;
    git: string;
    

    constructor(obj?: any) {
        this.title = obj ? obj.title : '';
        this.explanation = obj ? obj.explanation: '';
        this.img = obj ? obj.img: '';
        this.language = obj ? obj.language: '';
        this.web = obj ? obj.web: '';
        this.git = obj ? obj.git: '';
    }

    /*public toJSON() {
        return {
            title: this.title,
            explanation: this.explanation,
            img: this.img,
            language: this.language,
            web: this.web,
            git: this.git
        }
    }*/
}