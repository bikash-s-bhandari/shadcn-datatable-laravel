<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ProjectManager;

class ProjectManagerSeeder extends Seeder
{
    public function run(): void
    {
        ProjectManager::create([
            'name' => 'John Doe',
            'email' => 'john.doe@example.com',
            'phone' => '1234567890',
        ]);

        ProjectManager::create([
            'name' => 'Jane Smith',
            'email' => 'jane.smith@example.com',
            'phone' => '0987654321',
        ]);
    }
}
