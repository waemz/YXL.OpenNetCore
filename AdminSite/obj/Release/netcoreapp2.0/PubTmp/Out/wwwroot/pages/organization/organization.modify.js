﻿var organizationCreate = function () {

    function LoadLeaderData() {
        var leader = $("#Leader").val();
        var zTree = $.fn.zTree.getZTreeObj($("#LeaderName").attr("treeid"));
        var nodes = zTree.getNodeByParam("id", leader, null);
        zTree.selectNode(nodes);
        $("#LeaderName").val(nodes.name);
    }

    function LoadParentOrganizatioData() {
        var pid = $("#ParentOrganizationID").val();

        var zTree = $.fn.zTree.getZTreeObj($("#ParentOrganizationName").attr("treeid"));
        var nodes = zTree.getNodeByParam("id", pid, null);
        zTree.selectNode(nodes);
        $("#ParentOrganizationName").val(nodes.name);
    }


    var leaderSetting = {
        view: {
            dblClickExpand: false
        },
        check: {
            enable: true,
            chkStyle: "radio"
        },
        data: {
            simpleData: {
                enable: true
            }
        },
        callback: {
            beforeClick: function (treeId, treeNode) {
                return !treeNode.chkDisabled;
            }, onClick: function (e, treeId, treeNode) {
                $("#LeaderName").val(treeNode.name);
                $("#Leader").val(treeNode.id);
                $("#LeaderName").trigger("hideTree");
            }
        }
    };
    var parentOrganizationSetting = {
        view: {
            dblClickExpand: false
        },
        data: {
            simpleData: {
                enable: true
            }
        },
        callback: {
            onClick: function(e, treeId, treeNode) {
                $("#ParentOrganizationName").val(treeNode.name);
                $("#ParentOrganizationID").val(treeNode.id);
                $("#ParentOrganizationName").trigger("hideTree");
            }
        }
    };

    function ParentOrganizationNameBind() {
        $.ajax({
            type: "Post",
            datatype: "Json",
            url: "/Organization/ZtreeOrganization",
            success: function (data) {
                $("#ParentOrganizationName").ztreeSelect(parentOrganizationSetting, data);
                LoadParentOrganizatioData();
            },
            error: function (result) {
                alert("加载部门树错误："+result.status);
            }
        });
    }
    function LeaderNameBind() {
        $.ajax({
            type: "Post",
            datatype: "Json",
            url: "/User/OrganizationZTreeUsers",
            success: function (data) {
                $("#LeaderName").ztreeSelect(leaderSetting, data);
                LoadLeaderData();
            },
            error: function (result) {
                alert("加载用户树错误："+ result.status);
            }
        });
    }


    return {
        init: function () {
            ParentOrganizationNameBind();
            LeaderNameBind();
        }
    };
}();

jQuery(document).ready(function () {
    organizationCreate.init();
});