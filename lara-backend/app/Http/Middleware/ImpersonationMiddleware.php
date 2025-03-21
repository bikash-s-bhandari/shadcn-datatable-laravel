<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ImpersonationMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->user()->currentAccessToken()->can('impersonated')) {
            // Add headers for frontend to detect impersonation
            $response = $next($request);
            return $response->header('X-Impersonating', 'true');
        }

        return $next($request);
    }
}
