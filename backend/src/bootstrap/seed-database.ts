import { faker, SimpleFaker } from "@faker-js/faker";

// entity imports
import { Project, ProjectManager } from "../entity";
import { PROJECT_STATUS } from "../enum";

const randomResources = [
  "UI/UX Design",
  "Frontend Development",
  "Backend Development",
  "Quality Assurance",
  "Project Management",
  "DevOps",
  "Database Management",
  "Business Analysis",
  "Data Science",
  "Machine Learning",
  "Artificial Intelligence",
  "Cybersecurity",
  "Cloud Computing",
  "Network Security",
  "Technical Support",
  "Technical Writing",
  "Content Writing",
  "Digital Marketing",
  "SEO",
  "Social Media Marketing",
  "Email Marketing",
  "Affiliate Marketing",
  "Influencer Marketing",
];

// create a SimpleFaker without any locale data
const simpleFaker = new SimpleFaker();

const seedDatabase = async () => {
  try {
    const projectManagers = await ProjectManager.find();

    if (projectManagers.length === 0) {
      // Generate 50 fake project managers
      for (let i = 0; i < 50; i++) {
        const projectManager = ProjectManager.create({
          name: faker.person.fullName(),
          email: faker.internet.email(),
          phone: faker.phone.number(),
        });

        await projectManager.save();
      }
    }

    const projects = await Project.find();

    if (projects.length === 0) {
      // Generate 100 fake projects
      for (let i = 0; i < 100; i++) {
        const project = Project.create({
          name: faker.company.name(),
          project_manager_id: simpleFaker.number.int(50),
          status: simpleFaker.helpers.arrayElement(
            Object.values(PROJECT_STATUS)
          ),
          start_date: faker.date.past(),
          end_date: faker.date.future(),
          resources: simpleFaker.helpers.arrayElements(
            randomResources,
            simpleFaker.number.int(15)
          ),
          estimated_cost: simpleFaker.number.int(1000000),
          last_updated: faker.date.recent(),
        });

        await project.save();
      }
    }

    console.log("Database seeded successfully");
    return;
  } catch (error: any) {
    console.error(`Error in database connection: ${error.message}`);
  }
};

export default seedDatabase;
