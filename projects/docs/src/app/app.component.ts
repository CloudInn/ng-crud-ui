import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ng Crud Ui';
  sidenavItems = [
    {
      title: 'MetaData',
      items: [
        {
          title: "Building MetaData",
          icon: "fingerprint",
          routerLink: "/metadata"
        },
        {
          title: "Fields",
          icon: "extension",
          routerLink: "/metadata/fields"
        },
      ]
    },
    {
      title: "Forms",
      items: [
        {
          title: "Rendering Forms",
          icon: "search",
          routerLink: "/forms"
        },
        {
          title: "ForeignKey Field",
          icon: "public",
          routerLink: "/forms/foreignKey"
        }
      ]
    },
    {
      title: "Views",
      items: [
        {
          title: "Building Views",
          icon: "build",
          routerLink: "/views"
        }
      ]
    }
  ]
}
