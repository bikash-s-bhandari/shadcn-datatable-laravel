<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProjectManager extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'project_managers';

    protected $fillable = [
        'name',
        'email',
        'phone',
    ];

    public function projects()
    {
        return $this->hasMany(Project::class, 'project_manager_id');
    }
}
