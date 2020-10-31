import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

import { ProjectService } from '../services/project.service';
import { Project } from '../shared/project.model';

@Component({
	selector: 'app-projects',
	templateUrl: './projects.page.html',
	styleUrls: ['./projects.page.scss'],
})
export class ProjectsPage implements OnInit {
	public projects: Project[];

	constructor(
		private projectService: ProjectService,
		private loadingController: LoadingController
	) {}

	async ngOnInit() {
		const loadingIndicator = await this.loadingController.create({
			message: 'Loading Projects...',
		});

		await loadingIndicator.present();

		this.projectService.getAllProjects().subscribe(
			async (projects) => {
				this.projects = projects;
				await loadingIndicator.dismiss();
			},
			async (error) => {
				await loadingIndicator.dismiss();
			}
		);
	}
}
