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
      title: 'Get Started',
      items: [
        {
          title: "Installation",
          icon: "get_app",
          routerLink: "/installation"
        },
        {
          title: "Configuration",
          icon: "settings",
          routerLink: "/configuration"
        },
      ]
    },
    {
      title: 'MetaData',
      items: [
        {
          title: "Building MetaData",
          icon: "fingerprint",
          routerLink: "/metadata"
        },
        {
          title: "Field Defintions",
          icon: "extension",
          routerLink: "/fields"
        },
      ]
    },
    {
      title: "Forms",
      items: [
        {
          title: "Rendering Forms",
          icon: "format_shapes",
          routerLink: "/forms"
        },
        {
          title: "ForeignKey Fields",
          icon: "public",
          routerLink: "/foreignKeys"
        }
      ]
    },
    {
      title: "Views",
      items: [
        {
          title: "Constructing Views",
          icon: "screen_share",
          routerLink: "/views"
        },
        {
          title: "Reusable Components",
          icon: "build",
          routerLink: "/components"
        }
      ]
    }
  ]
}
