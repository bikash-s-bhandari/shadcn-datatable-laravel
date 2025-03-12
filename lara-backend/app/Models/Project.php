<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Enums\ProjectStatus;

class Project extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'projects';

    protected $fillable = [
        'name',
        'project_manager_id',
        'status',
        'start_date',
        'end_date',
        'resources',
        'estimated_cost',
        'last_updated',
        'last_updated_note',
    ];

    protected $casts = [
        'resources' => 'array',
        'start_date' => 'date',
        'end_date' => 'date',
        'last_updated' => 'date',
        'status' => ProjectStatus::class,

    ];

    public function projectManager()
    {
        return $this->belongsTo(ProjectManager::class, 'project_manager_id');
    }
}
