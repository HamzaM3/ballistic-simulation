import bpy

for action in bpy.data.actions:
    for channel in action.groups['Scale'].channels:
        for keypoints in channel.keyframe_points:
            keypoints.interpolation = 'CONSTANT'
        try:
            channel.keyframe_points[1].co[1] = 1
            channel.keyframe_points[2].co[1] = 0
        except:
            print('ok')