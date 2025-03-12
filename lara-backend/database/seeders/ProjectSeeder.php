<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Project;
use App\Models\ProjectManager;
use Faker\Factory as Faker;
use App\Enums\ProjectStatus;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();
        $managers = ProjectManager::all();

        if ($managers->isEmpty()) {
            $this->command->info('No project managers found. Please seed ProjectManagerSeeder first.');
            return;
        }

        for ($i = 0; $i < 100; $i++) {
            Project::create([
                'name' => $faker->sentence(3),
                'project_manager_id' => $managers->random()->id,
                'status' => $faker->randomElement(ProjectStatus::values()),
                'start_date' => $faker->date(),
                'end_date' => $faker->date(),
                'resources' => json_encode([$faker->word, $faker->word, $faker->word]),
                'estimated_cost' => $faker->numberBetween(10000, 500000),
                'last_updated' => $faker->date(),
                'last_updated_note' => $faker->sentence(6),
            ]);
        }
    }
}
