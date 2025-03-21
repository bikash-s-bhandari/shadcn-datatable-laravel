<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Insert an admin user
        DB::table('users')->insert([
            'name' => 'Admin User',
            'email' => 'admin@gmail.com',
            'role' => 'admin',
            'password' => Hash::make('admin'), // Change the password as needed
            'email_verified_at' => now(),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Insert 5 manager users
        for ($i = 1; $i <= 5; $i++) {
            DB::table('users')->insert([
                'name' => "Manager $i",
                'email' => "manager$i@admin.com",
                'role' => 'manager',
                'password' => Hash::make('manager'), // Change the password as needed
                'email_verified_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
