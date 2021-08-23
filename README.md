# Favalogyc - Angular Front End

Plataforma de Logistica del Grupo Fava en Angular 9 y Angular Material

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

Nota 1: [ref angular para ejecutar en Apache](https://angular.io/guide/deployment#routed-apps-must-fallback-to-indexhtml)
para ejecutar en un servidor externo apache, copiar el contenido del directorio `dist/` a `htdocs`
y agregar en la raiz del sitio un archivo `.htaccess` con 

```
RewriteEngine On
# If an existing asset or directory is requested go to it as it is
RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -f [OR]
RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -d
RewriteRule ^ - [L]

# If the requested resource doesn't exist, use index.html
RewriteRule ^ /index.html
```
Nota 2: [ref angular para subdominio](https://angular.io/guide/deployment#the-base-tag)
para build en un subdominio ejecutar `ng build --base-href "/favalogyc/" --prod`, 
luego mover el directorio `dist` a `htdocs` y renombrar como `favalogyc` 


Nota 3: peeeero, para ejecutar el build en un subdominio, la ultima linea del  `.htaccess` debe ser 
```
RewriteRule ^ /favalogyc/index.html
```

## Fuse - Angular

Basado Material Design Admin Template with Angular 9 and Angular Material

## The Community

Share your ideas, discuss Fuse and help each other.

[Click here](http://fusetheme.com/community) to see our Community page.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

