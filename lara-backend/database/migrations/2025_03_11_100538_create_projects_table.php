<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->text('name');
            $table->unsignedBigInteger('project_manager_id');
            $table->enum('status', \App\Enums\ProjectStatus::values())->default(\App\Enums\ProjectStatus::ON_TRACK->value);

            $table->date('start_date');
            $table->date('end_date');
            $table->json('resources')->nullable();
            $table->integer('estimated_cost');
            $table->date('last_updated');
            $table->text('last_updated_note');
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('project_manager_id')->references('id')->on('project_managers')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
