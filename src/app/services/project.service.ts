import { Injectable } from '@angular/core';
import { HttpClient, HttpProgressEvent } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Subject } from 'rxjs';

import { Project } from '../shared/project.model';

@Injectable({
	providedIn: 'root',
})
export class ProjectService {
	constructor(
		private httpClient: HttpClient,
		private toastController: ToastController
	) {}

	createProject(project: Project) {
		const postSubject = new Subject();

		this.httpClient
			.post<Project[]>('https://192.168.0.223:5001/api/projects', project)
			.subscribe(
				async (_) => {
					const toast = await this.toastController.create({
						message: `Project '${project.name} was created successfully'`,
						duration: 3000,
					});
					await toast.present();
					postSubject.next();
				},
				async (err) => {
					console.log(`error creating project '${project.name}'`);
					const toast = await this.toastController.create({
						message: `An error occurred while creating project '${project.name}'`,
						duration: 3000,
					});
					await toast.present();
					postSubject.error(err);
				}
			);

		return postSubject.asObservable();
	}

	getAllProjects() {
		const projectsSubject = new Subject<Project[]>();

		this.httpClient
			.get<Project[]>('https://192.168.0.223:5001/api/projects')
			.subscribe(
				async (projects) => {
					projectsSubject.next(projects);
				},
				async (error) => {
					console.error('An error occurred getting all projects');
					const toast = await this.toastController.create({
						message: `An error occurred while getting all projects`,
						duration: 3000,
					});
					await toast.present();
					projectsSubject.error(error);
				}
			);

		return projectsSubject.asObservable();
	}
}
