import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.scss"]
})
export class AboutComponent implements OnInit {
  team: { name: string; profile: string; image: string }[] = new Array();
  constructor() {}

  ngOnInit() {
    this.team.push({
      name: "Vikalp Shukla - Founder & CEO ",
      profile: "https://www.linkedin.com/in/vikalp-shukla-280810140/",
      image: "assets/images/profile_images/Vikalp_Shukla.png"
    });
    this.team.push({
      name: "Tushar Saraswat - Cofounder & CMO ",
      profile: "https://www.linkedin.com/in/tusharsaraswat/",
      image: "assets/images/profile_images/Tushar_Saraswat.jpg"
    });
    this.team.push({
      name: "Ankit Kumar - Operations Head ",
      profile: "https://www.linkedin.com/in/ankit-kumar-2505",
      image: "assets/images/profile_images/Ankit_Kumar.png"
    });
    this.team.push({
      name: "Nikhil Gupta - Blockchain Developer ",
      profile: "https://www.linkedin.com/in/nikhilgupta23/",
      image: "assets/images/profile_images/Nikhil_Gupta.png"
    });
    this.team.push({
      name: "Devansh Ojha - Blockchain Developer ",
      profile: "https://www.linkedin.com/in/devansh-ojha-9a0a46aa",
      image: "assets/images/profile_images/Devansh_Ojha.png"
    });
    this.team.push({
      name: "Chintam Anand - Web Developer ",
      profile: "https://www.linkedin.com/in/anand-chintam-334347140/",
      image: "assets/images/profile_images/Chintam_Anand.png"
    });
    this.team.push({
      name: "Mayank Mahajan - Head of Finances ",
      profile: "https://www.linkedin.com/in/mayank-mahajan-72a981103",
      image: "assets/images/profile_images/Mayank_Mahajan.png"
    });
    this.team.push({
      name: "Kapil Kapdi - Smart Contract Developer ",
      profile: "http://linkedin.com/in/kapil-kapadi-13465b149",
      image: "assets/images/profile_images/Kapil_Kapdi.png"
    });
  }
}
