<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'status' => $this->status,
            'start_date'=>$this->start_date->format('m/d/Y'),
            'end_date'=>$this->end_date->format('m/d/Y'),
            'estimated_cost' => $this->estimated_cost,
            'project_manager' => [
                'id' => $this->projectManager?->id,
                'name' => $this->projectManager?->name,
                'email' => $this->projectManager?->email,
            ],
            'last_updated' => $this->updated_at->format('m/d/Y'),
            'last_updated_note'=>$this->last_updated_note,
            'resources'=>json_decode($this->resources)
        ];
    }
}
