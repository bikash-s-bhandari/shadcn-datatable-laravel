<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Enums\ProjectStatus;
use App\Models\Project;
use App\Models\ProjectManager;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Exception;
use App\Http\Resources\ProjectResource;
use Illuminate\Support\Facades\Auth;

class ProjectController extends Controller
{
    /**
     * Get projects list
     * @route POST /api/projects
     * @access Public
     */
    public function index(Request $request)
    {
        try {
            // Validation rules
            $validator = Validator::make($request->all(), [
                'pagination' => 'required|array',
                'pagination.pageIndex' => 'required|numeric',
                'pagination.pageSize' => 'required|numeric',
                // 'sorting' => 'nullable|array',
                // 'sorting.*.id' => 'required|in:id,name,status,estimated_cost,project_manager_name,last_updated',
                // 'sorting.*.desc' => 'required|boolean',
                'searchQuery' => 'nullable|string'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 'error',
                    'message' => $validator->errors()->first()
                ], 400);
            }

            $searchQuery = $request->input('searchQuery', '');
            $pagination = $request->input('pagination', [
                'pageIndex' => 0,
                'pageSize' => 10
            ]);
            $sorting = $request->input('sorting', []);
            $filters = $request->input('filters', []);

            $user = Auth::user();

            // Build the query
            $query = Project::query()
                ->with('projectManager:id,name,email')
                ->leftJoin('project_managers as pm', 'projects.project_manager_id', '=', 'pm.id')
                ->select('projects.*', 'pm.name as project_manager_name');

            if ($user->role === 'manager') {
                $query->where('projects.user_id', $user->id);
            }

            // Apply filters
            foreach ($filters as $filter) {
                if ($filter['id'] === 'status' && $filter['value']!=='all') {
                    $query->where('projects.status', $filter['value']);
                }
            }


            // Search functionality
            if (!empty($searchQuery)) {
                $query->where(function ($q) use ($searchQuery) {
                    $q->where('projects.name', 'like', "%{$searchQuery}%")
                        ->orWhere('projects.status', 'like', "%{$searchQuery}%")
                        ->orWhere('pm.name', 'like', "%{$searchQuery}%")
                        ->orWhere('pm.email', 'like', "%{$searchQuery}%");
                });
            }

            // Sorting
            foreach ($sorting as $sort) {
                $column = $this->getSortingColumn($sort['id']);
                $direction = $sort['desc'] ? 'desc' : 'asc';
                $query->orderBy($column, $direction);
            }

            // Get total count before pagination
            $totalCount = $query->count();

            // Apply pagination
            $projects = $query
                ->offset($pagination['pageIndex'] * $pagination['pageSize'])
                ->limit($pagination['pageSize'])
                ->get();

            return response()->json([
                'status' => 'success',
                'message' => 'Projects list',
                'data' => [
                    'totalCount' => $totalCount,
                    'projects' => ProjectResource::collection($projects)
                ]
            ], 200);

        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 400);
        }
    }

    /**
     * Map sorting key to database column
     */
    private function getSortingColumn(string $key): string
    {
        if ($key === 'project_manager_name') {
            return 'pm.name';
        }

        return "projects.{$key}";
    }
}